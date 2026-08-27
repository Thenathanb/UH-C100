import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { categoryStyles } from "../data/events.js";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MAX_INLINE = 2;

function toKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

/** "6:00 PM" -> "6p", "3:00 PM - 5:00 PM" -> "3p" (start time only, compact). */
function compactTime(time) {
  if (!time) return null;
  const start = time.split(" - ")[0].trim();
  const m = start.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return null;
  const [, h, min, ap] = m;
  const suffix = ap.toLowerCase()[0];
  return min === "00" ? `${h}${suffix}` : `${h}:${min}${suffix}`;
}

export default function EventCalendar({ events, selectedDate, onSelectDate }) {
  const [monthCursor, setMonthCursor] = useState(() => {
    const seed = events[0] ? new Date(`${events[0].date}T00:00:00`) : new Date();
    return new Date(seed.getFullYear(), seed.getMonth(), 1);
  });

  const eventsByDay = useMemo(() => {
    const map = new Map();
    for (const event of events) {
      const key = event.date;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(event);
    }
    return map;
  }, [events]);

  const monthLabel = monthCursor.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Full 6-week grid, including the tail of the previous month and the
  // start of the next — matching a real calendar, not just blank cells.
  const gridStart = new Date(monthCursor);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());
  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    return d;
  });

  const todayKey = toKey(new Date());
  const isCurrentMonth = (d) => d.getMonth() === monthCursor.getMonth();

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-paper">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() =>
              setMonthCursor((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))
            }
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink/60 hover:border-ink hover:text-ink"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() =>
              setMonthCursor((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))
            }
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink/60 hover:border-ink hover:text-ink"
          >
            ›
          </button>
          <button
            type="button"
            onClick={() => setMonthCursor(new Date(new Date().getFullYear(), new Date().getMonth(), 1))}
            className="ml-1 rounded-full border border-line px-3 py-1.5 text-xs font-bold text-ink/70 hover:border-ink hover:text-ink"
          >
            Today
          </button>
        </div>
        <h3 className="font-display text-lg font-bold text-ink sm:text-xl">{monthLabel}</h3>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-full border border-line px-3 py-1.5 text-xs font-bold text-ink/70 hover:border-ink hover:text-ink"
        >
          Print
        </button>
      </div>

      <div className="grid grid-cols-7 border-b border-line bg-cloud text-center text-[11px] font-bold uppercase tracking-wide text-ink/50">
        {WEEKDAYS.map((w) => (
          <span key={w} className="py-2">
            {w}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((date, i) => {
          const key = toKey(date);
          const dayEvents = eventsByDay.get(key) ?? [];
          const inMonth = isCurrentMonth(date);
          const isSelected = selectedDate === key;
          const isToday = key === todayKey;
          const inline = dayEvents.slice(0, MAX_INLINE);
          const overflow = dayEvents.length - inline.length;

          return (
            <div
              key={key}
              className={`min-h-[92px] border-b border-r border-line p-1.5 sm:min-h-[110px] sm:p-2 [&:nth-child(7n)]:border-r-0 ${
                isSelected ? "bg-rose/10" : isToday ? "bg-rose-soft/60" : inMonth ? "bg-paper" : "bg-cloud/50"
              }`}
            >
              <span
                className={`text-xs font-semibold ${
                  isToday ? "text-rose" : inMonth ? "text-ink" : "text-ink/30"
                }`}
              >
                {date.getDate()}
              </span>

              <div className="mt-1 flex flex-col gap-0.5">
                {inline.map((e) => (
                  <Link
                    key={e.id}
                    to={`/events/${e.id}`}
                    className="flex items-center gap-1 truncate rounded px-0.5 py-px text-left text-[10px] font-medium leading-tight text-ink/80 hover:bg-rose/10 hover:text-rose sm:text-[11px]"
                    title={e.title}
                  >
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        categoryStyles[e.category]?.dot ?? "bg-ink-soft"
                      }`}
                    />
                    <span className="truncate">
                      {compactTime(e.time) ? `${compactTime(e.time)} ` : ""}
                      {e.title}
                    </span>
                  </Link>
                ))}
                {overflow > 0 && (
                  <button
                    type="button"
                    onClick={() => onSelectDate(isSelected ? null : key)}
                    className="truncate rounded px-0.5 text-left text-[10px] font-bold text-rose hover:underline sm:text-[11px]"
                  >
                    +{overflow} more
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 p-4 sm:p-5">
        {Object.values(categoryStyles).map((c) => (
          <span key={c.label} className="flex items-center gap-1.5 text-[11px] font-medium text-ink/50">
            <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}
