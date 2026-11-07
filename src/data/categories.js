// All categories live here. Each category has:
//  - id        : used in the URL (?category=cars)
//  - name      : shown to the user
//  - colors    : gradient used as a fallback while the cover photo loads
//  - queries   : what we search on Pexels (several queries = more variety)
//  - perQuery  : how many photos to take from each query per page
// To add a new category, just add one object here - every page updates.
export const CATEGORIES = [
  {
    id: "indian-culture",
    name: "Indian Culture",
    colors: ["#ff9933", "#138808"],
    perQuery: 6,
    queries: ["Indian culture", "Diwali festival", "Holi colors India", "Indian temple architecture"],
  },
  {
    id: "cars",
    name: "Cars",
    colors: ["#ff2d3d", "#5b0a12"],
    perQuery: 10,
    queries: ["sports car", "supercar", "classic muscle car"],
  },
  {
    id: "cartoon",
    name: "Cartoon",
    colors: ["#ffd23f", "#ff5c7a"],
    perQuery: 12,
    queries: ["cartoon", "cartoon character illustration", "colorful animation art"],
  },
  {
    id: "anime",
    name: "Anime",
    colors: ["#ff8fb8", "#6c5ce7"],
    perQuery: 8,
    queries: ["anime", "anime aesthetic", "japan neon street"],
  },
  {
    id: "nature",
    name: "Nature",
    colors: ["#4cc27a", "#0b3d2e"],
    perQuery: 8,
    queries: ["nature landscape", "forest", "waterfall"],
  },
  {
    id: "space",
    name: "Space",
    colors: ["#6c8cff", "#1a1040"],
    perQuery: 8,
    queries: ["galaxy", "nebula stars", "planet space"],
  },
  {
    id: "mountains",
    name: "Mountains",
    colors: ["#5fb8e6", "#1b2a3a"],
    perQuery: 8,
    queries: ["mountains", "snow mountain peak", "himalaya"],
  },
  {
    id: "animals",
    name: "Animals",
    colors: ["#e0a23b", "#5a3a10"],
    perQuery: 8,
    queries: ["wild animals", "cute cat", "birds"],
  },
  {
    id: "technology",
    name: "Technology",
    colors: ["#00e5ff", "#0a1a3a"],
    perQuery: 8,
    queries: ["technology", "futuristic city", "circuit board"],
  },
  {
    id: "gaming",
    name: "Gaming",
    colors: ["#39ff88", "#1a0a3a"],
    perQuery: 8,
    queries: ["gaming setup", "video game controller", "esports neon"],
  },
  {
    id: "abstract",
    name: "Abstract",
    colors: ["#b46cff", "#ff6cae"],
    perQuery: 8,
    queries: ["abstract", "abstract art colorful", "fluid gradient"],
  },
  {
    id: "minimal",
    name: "Minimal",
    colors: ["#9a9aab", "#2a2a36"],
    perQuery: 8,
    queries: ["minimal", "minimalist background", "simple texture"],
  },
];

// Quick lookup: CATEGORY_MAP["cars"] -> the cars category object
export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));

// The "All" view mixes the first query of these categories together
export const HOME_MIX_IDS = CATEGORIES.slice(0, 6).map((c) => c.id);

// Categories that get their own row on the Home page
export const HIGHLIGHT_IDS = ["indian-culture", "cars", "cartoon"];

// Accepts an id ("indian-culture") or a name ("Indian Culture") and
// returns the category id, or "all" if nothing matches.
export function toCategoryId(value) {
  if (!value) return "all";
  const text = value.toLowerCase();
  const match = CATEGORIES.find(
    (c) => c.id === text || c.name.toLowerCase() === text
  );
  return match ? match.id : "all";
}
