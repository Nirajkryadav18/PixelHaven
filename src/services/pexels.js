// All communication with the Pexels API happens in THIS file only.
// The rest of the app never calls fetch() for photos directly.
import { CATEGORIES, CATEGORY_MAP, HOME_MIX_IDS } from "../data/categories.js";
import { readJSON, writeJSON } from "../utils/storage.js";

const API_URL = "https://api.pexels.com/v1";
const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

const CACHE_PREFIX = "ph:api:";
const CACHE_TTL = 30 * 60 * 1000; // API answers are reused for 30 minutes
const COVERS_KEY = "ph:covers:v1";
const COVERS_TTL = 24 * 60 * 60 * 1000; // category cover photos: 1 day

export class PexelsError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = "PexelsError";
    this.status = status;
  }
}

function messageFor(status) {
  if (status === 401 || status === 403)
    return "Pexels rejected the API key. Check VITE_PEXELS_API_KEY in your .env file.";
  if (status === 404) return "This wallpaper was not found on Pexels.";
  if (status === 429)
    return "Pexels request limit reached. Please wait a little and try again.";
  return `Pexels is not responding right now (error ${status}).`;
}

// ---------- tiny cache (saves the free API limit) ----------
const inflight = new Map(); // same request made twice at once -> one call

function readCache(url) {
  try {
    const raw = sessionStorage.getItem(CACHE_PREFIX + url);
    if (!raw) return null;
    const { at, data } = JSON.parse(raw);
    return Date.now() - at < CACHE_TTL ? data : null;
  } catch {
    return null;
  }
}

function writeCache(url, data) {
  try {
    sessionStorage.setItem(CACHE_PREFIX + url, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // storage is full: throw away old API answers and move on
    Object.keys(sessionStorage)
      .filter((key) => key.startsWith(CACHE_PREFIX))
      .forEach((key) => sessionStorage.removeItem(key));
  }
}

// ---------- the one function that talks to Pexels ----------
async function get(path, params = {}) {
  if (!API_KEY) {
    throw new PexelsError(
      "Pexels API key not found. Add VITE_PEXELS_API_KEY to your .env file, then restart `npm run dev`.",
      401
    );
  }

  const url = new URL(API_URL + path);
  Object.entries(params).forEach(([name, value]) => {
    if (value !== undefined && value !== null) url.searchParams.set(name, value);
  });
  const key = url.toString();

  const cached = readCache(key);
  if (cached) return cached;
  if (inflight.has(key)) return inflight.get(key);

  const request = fetch(key, { headers: { Authorization: API_KEY } })
    .then(async (response) => {
      if (!response.ok) throw new PexelsError(messageFor(response.status), response.status);
      const data = await response.json();
      writeCache(key, data);
      return data;
    })
    .catch((error) => {
      if (error instanceof PexelsError) throw error;
      throw new PexelsError("Could not reach Pexels. Check your internet connection and try again.");
    })
    .finally(() => inflight.delete(key));

  inflight.set(key, request);
  return request;
}

// ---------- turning a Pexels photo into OUR wallpaper shape ----------
function getResolutionLabel(width, height) {
  const longSide = Math.max(width, height);
  if (longSide >= 7680) return "8K";
  if (longSide >= 3840) return "4K";
  if (longSide >= 2560) return "2K";
  if (longSide >= 1920) return "Full HD";
  return "HD";
}

function buildTitle(photo, category) {
  const alt = (photo.alt || "").trim();
  if (!alt) return `${category ? category.name : "Wallpaper"} by ${photo.photographer}`;
  const title = alt.charAt(0).toUpperCase() + alt.slice(1);
  return title.length > 60 ? `${title.slice(0, 57)}...` : title;
}

export function normalizePhoto(photo, category = null) {
  return {
    id: String(photo.id),
    title: buildTitle(photo, category),
    category: category ? category.name : "Wallpaper",
    categoryId: category ? category.id : null,
    image: photo.src.portrait, // card image
    fullImage: photo.src.large2x, // big image on the details page
    downloadUrl: photo.src.original, // best quality for download
    width: photo.width,
    height: photo.height,
    resolution: getResolutionLabel(photo.width, photo.height),
    avgColor: photo.avg_color || "#1f1f2a",
    photographer: photo.photographer,
    photographerUrl: photo.photographer_url,
    pexelsUrl: photo.url,
  };
}

// ---------- feeds (lists of wallpapers) ----------
// Decides WHICH Pexels searches are needed for a category / search term.
function buildJobs(categoryId, term) {
  const category = CATEGORY_MAP[categoryId] || null;

  if (term) {
    // user typed something: search it (inside the chosen category if any)
    const query = category ? `${term} ${category.name}` : term;
    return [{ query, category, perPage: 24 }];
  }
  if (category) {
    return category.queries.map((query) => ({
      query,
      category,
      perQuery: category.perQuery,
      perPage: category.perQuery,
    }));
  }
  // "All": a mix of the main categories
  return HOME_MIX_IDS.map((id) => ({
    query: CATEGORY_MAP[id].queries[0],
    category: CATEGORY_MAP[id],
    perPage: 6,
  }));
}

// [[a1,a2],[b1,b2]] -> [a1,b1,a2,b2]  (so categories are mixed nicely)
function interleave(lists) {
  const result = [];
  const longest = Math.max(0, ...lists.map((list) => list.length));
  for (let i = 0; i < longest; i += 1) {
    lists.forEach((list) => {
      if (list[i]) result.push(list[i]);
    });
  }
  return result;
}

export async function fetchFeedPage({ categoryId = "all", term = "", page = 1 }) {
  const jobs = buildJobs(categoryId, term.trim());
  const settled = await Promise.allSettled(
    jobs.map((job) => get("/search", { query: job.query, page, per_page: job.perPage }))
  );

  const succeeded = settled
    .map((result, index) => ({ result, job: jobs[index] }))
    .filter(({ result }) => result.status === "fulfilled");

  // every request failed -> show the error. Some failed -> show what we have.
  if (succeeded.length === 0) throw settled[0].reason;

  const lists = succeeded.map(({ result, job }) =>
    result.value.photos.map((photo) => normalizePhoto(photo, job.category))
  );
  return {
    items: interleave(lists),
    hasMore: succeeded.some(({ result }) => Boolean(result.value.next_page)),
  };
}

export async function fetchPhotoById(id) {
  const photo = await get(`/photos/${encodeURIComponent(id)}`);
  return normalizePhoto(photo, null);
}

// ---------- category cover photos ----------
// One small request per category, then remembered for a day.
// Never throws: a missing cover just shows the category gradient.
export async function fetchCategoryCovers() {
  const stored = readJSON(COVERS_KEY, {});
  const covers = {};
  const missing = [];

  CATEGORIES.forEach((category) => {
    const entry = stored[category.id];
    if (entry && Date.now() - entry.at < COVERS_TTL) covers[category.id] = entry.url;
    else missing.push(category);
  });

  if (missing.length > 0 && API_KEY) {
    const results = await Promise.allSettled(
      missing.map((category) => get("/search", { query: category.queries[0], per_page: 1 }))
    );
    results.forEach((result, index) => {
      const photo = result.status === "fulfilled" ? result.value.photos[0] : null;
      if (photo) {
        const id = missing[index].id;
        covers[id] = photo.src.large;
        stored[id] = { url: photo.src.large, at: Date.now() };
      }
    });
    writeJSON(COVERS_KEY, stored);
  }
  return covers;
}
