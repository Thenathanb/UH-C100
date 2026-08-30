// Builds "add to my calendar" links/files from our own event data — no
// live third-party calendar account needed. Times are emitted as floating
// local time (no timezone conversion): every event is in Houston, and
// nearly everyone opening these links has their calendar app already set
// to Central time, so this is correct for the real audience without
// needing DST-aware UTC math.

function parseClock(str) {
  const m = str.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;
  let [, h, min, ap] = m;
  h = parseInt(h, 10);
  min = parseInt(min, 10);
  if (/pm/i.test(ap) && h !== 12) h += 12;
  if (/am/i.test(ap) && h === 12) h = 0;
  return { hours: h, minutes: min };
}

/** Returns { allDay, start, end } as local Date objects (wall-clock, not UTC). */
export function getEventTimeRange(event) {
  const [year, month, day] = event.date.split("-").map(Number);
  const asAllDay = () => ({
    allDay: true,
    start: new Date(year, month - 1, day),
    end: new Date(year, month - 1, day + 1),
  });

  if (!event.time || event.time === "TBD") return asAllDay();

  const [startPart, endPart] = event.time.split(" - ").map((s) => s.trim());
  const startClock = parseClock(startPart);
  if (!startClock) return asAllDay();

  const start = new Date(year, month - 1, day, startClock.hours, startClock.minutes);
  const endClock = endPart ? parseClock(endPart) : null;
  const end = endClock
    ? new Date(year, month - 1, day, endClock.hours, endClock.minutes)
    : new Date(start.getTime() + 60 * 60000); // default 1hr if no end given

  return { allDay: false, start, end };
}

const pad = (n) => String(n).padStart(2, "0");
const toFloatingStamp = (d) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
const toDateStamp = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
const toUtcStamp = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

export function googleCalendarUrl(event) {
  const { allDay, start, end } = getEventTimeRange(event);
  const dates = allDay
    ? `${toDateStamp(start)}/${toDateStamp(end)}`
    : `${toFloatingStamp(start)}/${toFloatingStamp(end)}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates,
    details: event.summary || "",
    location: event.location || "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeIcsText(s) {
  return String(s)
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function icsFileContent(event) {
  const { allDay, start, end } = getEventTimeRange(event);
  const dtStart = allDay
    ? `DTSTART;VALUE=DATE:${toDateStamp(start)}`
    : `DTSTART:${toFloatingStamp(start)}`;
  const dtEnd = allDay
    ? `DTEND;VALUE=DATE:${toDateStamp(end)}`
    : `DTEND:${toFloatingStamp(end)}`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Collegiate 100 Clutch City//Events//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event.id}@collegiate100uh`,
    `DTSTAMP:${toUtcStamp(new Date())}`,
    dtStart,
    dtEnd,
    `SUMMARY:${escapeIcsText(event.title)}`,
    event.location ? `LOCATION:${escapeIcsText(event.location)}` : null,
    event.summary ? `DESCRIPTION:${escapeIcsText(event.summary)}` : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  return lines.join("\r\n");
}

/** Downloads a .ics file for the event — opens directly in Apple Calendar
 * (and Outlook, and any other calendar app) on click. */
export function downloadIcs(event) {
  const blob = new Blob([icsFileContent(event)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.id}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
