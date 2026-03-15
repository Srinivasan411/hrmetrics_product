// Build routes from legacy HTML files located under `src/pages/legacy/`.
// Pages are lazy-loaded so we don't bundle every legacy HTML file into the main chunk.

const legacyIndexModules = import.meta.glob("./pages/legacy/**/index.html", {
  query: "?raw",
  import: "default",
});

const rootModule = () => import("./pages/legacy/index.static.html?raw");

export function getLegacyRouteEntries() {
  const entries = [];

  for (const [filePath, loader] of Object.entries(legacyIndexModules)) {
    const withoutPrefix = filePath.replace("./pages/legacy/", "");
    const routePath = "/" + withoutPrefix.replace("/index.html", "");
    entries.push([routePath, loader]);
  }

  entries.sort((a, b) => a[0].localeCompare(b[0]));

  // Put `/` first and keep everything else afterwards.
  return [["/", () => rootModule().then((m) => m.default)], ...entries.filter(([p]) => p !== "/")];
}

