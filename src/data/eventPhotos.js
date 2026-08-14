// Each event gets its own folder of photos at src/assets/events/<event-id>/.
// Drop any number of image files in a folder (named however you like — 01.jpg,
// 02.jpg, ... sorts them in order) and they show up automatically in that
// event's swipeable gallery. No data file edits needed.

const modules = import.meta.glob("../assets/events/*/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const photosByEvent = {};

for (const path in modules) {
  const match = path.match(/events\/([^/]+)\/([^/]+)$/);
  if (!match) continue;
  const [, eventId, filename] = match;
  (photosByEvent[eventId] ??= []).push({ filename, url: modules[path] });
}

for (const eventId in photosByEvent) {
  photosByEvent[eventId].sort((a, b) =>
    a.filename.localeCompare(b.filename, undefined, { numeric: true })
  );
}

export function getEventPhotos(eventId) {
  return (photosByEvent[eventId] ?? []).map((p) => p.url);
}
