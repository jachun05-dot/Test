// Seeded random numbers, so the same seed always rebuilds the same worksheet
// (in the browser and at build time).

function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRng(seed) {
  const next = mulberry32(seed);
  const int = (min, max) => min + Math.floor(next() * (max - min + 1));
  const pick = (arr) => arr[Math.floor(next() * arr.length)];
  const chance = (p) => next() < p;
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(next() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  return { next, int, pick, chance, shuffle };
}

// FNV-1a: stable seed from a string (used for the default sheet of each page).
export function hashString(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function randomSeed() {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    return crypto.getRandomValues(new Uint32Array(1))[0] % 2176782336; // 6 base-36 chars
  }
  return Math.floor(Math.random() * 2176782336);
}

// Short code printed on each sheet so a teacher can rebuild it later.
export const seedToCode = (seed) => seed.toString(36).toUpperCase();
export const codeToSeed = (code) => {
  const n = parseInt(String(code), 36);
  return Number.isFinite(n) && n >= 0 ? n % 2176782336 : null;
};
