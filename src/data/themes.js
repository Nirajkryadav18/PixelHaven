// Every theme is a small colour palette. When the user clicks "Apply Theme"
// these colours are written into the CSS variables (see ThemeContext.jsx),
// so the WHOLE website changes colour.
//  bg / surface : page background and card background
//  text / muted : main text and softer text
//  accent       : buttons, highlights (accentText = text colour on top of it)
export const DEFAULT_THEME_ID = "midnight-dark";

const themes = [
  {
    id: "midnight-dark",
    name: "Midnight Dark",
    categoryId: "minimal",
    description: "The classic PixelHaven look: deep black with soft purple accents.",
    colors: { bg: "#0f0f14", surface: "#17171f", text: "#f2f2f7", muted: "#9a9aab", accent: "#7c5cff", accentText: "#ffffff", border: "#2a2a36" },
  },
  {
    id: "paper-light",
    name: "Paper Light",
    categoryId: "minimal",
    mode: "light",
    description: "Clean white theme that is easy to read in daylight.",
    colors: { bg: "#f6f6f9", surface: "#ffffff", text: "#14141c", muted: "#6a6a7c", accent: "#5b3df5", accentText: "#ffffff", border: "#dcdce6" },
  },
  {
    id: "saffron-heritage",
    name: "Saffron Heritage",
    categoryId: "indian-culture",
    description: "Warm saffron and deep brown, inspired by Indian festivals and temples.",
    colors: { bg: "#1a0f05", surface: "#26170a", text: "#fff4e5", muted: "#c9a37a", accent: "#ff9933", accentText: "#1a0f05", border: "#43290f" },
  },
  {
    id: "racing-red",
    name: "Racing Red",
    categoryId: "cars",
    description: "High energy red and black for car and speed lovers.",
    colors: { bg: "#0d0d0f", surface: "#18181c", text: "#f5f5f7", muted: "#a0a0aa", accent: "#ff2d3d", accentText: "#ffffff", border: "#2c2c33" },
  },
  {
    id: "toon-pop",
    name: "Toon Pop",
    categoryId: "cartoon",
    description: "Fun, bright yellow on deep indigo. Like a Saturday morning cartoon.",
    colors: { bg: "#14112b", surface: "#1e1a3f", text: "#fff8e1", muted: "#b5aee0", accent: "#ffd23f", accentText: "#14112b", border: "#332d63" },
  },
  {
    id: "sakura-pastel",
    name: "Sakura Pastel",
    categoryId: "anime",
    description: "Soft pink pastel colours with an anime-inspired feel.",
    colors: { bg: "#1f1522", surface: "#2b1d30", text: "#fff0f6", muted: "#c9a5b8", accent: "#ff8fb8", accentText: "#2b1d30", border: "#452d4d" },
  },
  {
    id: "nature-escape",
    name: "Nature Escape",
    categoryId: "nature",
    description: "Calm forest greens and earthy tones.",
    colors: { bg: "#0c150f", surface: "#142119", text: "#eef8f0", muted: "#8fb09a", accent: "#4cc27a", accentText: "#06140b", border: "#23392b" },
  },
  {
    id: "galaxy-explorer",
    name: "Galaxy Explorer",
    categoryId: "space",
    description: "Deep space navy with a glowing blue accent.",
    colors: { bg: "#070818", surface: "#0e1030", text: "#eef0ff", muted: "#8f96c9", accent: "#6c8cff", accentText: "#070818", border: "#212555" },
  },
  {
    id: "alpine-frost",
    name: "Alpine Frost",
    categoryId: "mountains",
    description: "Cold blue-grey tones like a snowy mountain morning.",
    colors: { bg: "#0b1218", surface: "#131d26", text: "#eaf4fa", muted: "#8aa5b8", accent: "#5fb8e6", accentText: "#0b1218", border: "#22323f" },
  },
  {
    id: "wild-amber",
    name: "Wild Amber",
    categoryId: "animals",
    description: "Golden amber and warm brown, inspired by the wild.",
    colors: { bg: "#17110a", surface: "#231a0f", text: "#fbf1e2", muted: "#b9a283", accent: "#e0a23b", accentText: "#17110a", border: "#3b2c18" },
  },
  {
    id: "cyber-neon",
    name: "Cyber Neon",
    categoryId: "technology",
    description: "Futuristic cyan glow on a dark tech background.",
    colors: { bg: "#060b14", surface: "#0d1522", text: "#e6faff", muted: "#7fa3b3", accent: "#00e5ff", accentText: "#001018", border: "#1a2a3d" },
  },
  {
    id: "player-one",
    name: "Player One",
    categoryId: "gaming",
    description: "Neon green on black. Made for gamers.",
    colors: { bg: "#0a0a12", surface: "#14141f", text: "#eafff2", muted: "#84a893", accent: "#39ff88", accentText: "#04140a", border: "#232333" },
  },
  {
    id: "aurora-gradient",
    name: "Aurora Gradient",
    categoryId: "abstract",
    description: "Dreamy violet and magenta, like northern lights.",
    colors: { bg: "#100a1c", surface: "#1a1230", text: "#f6efff", muted: "#a898c9", accent: "#b46cff", accentText: "#100a1c", border: "#32254f" },
  },
];

export const THEME_MAP = Object.fromEntries(themes.map((t) => [t.id, t]));

export default themes;
