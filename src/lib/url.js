// Prefixes root-relative paths (e.g. "/images/hero.jpg") with Vite's BASE_URL
// so they resolve correctly when the site is deployed under a subpath
// (e.g. GitHub Pages project sites at /UH-C100/). External URLs pass through untouched.
export function withBase(path) {
  if (!path) return path;
  if (/^([a-z]+:)?\/\//i.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
