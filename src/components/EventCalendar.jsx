import { useMemo, useState } from "react";
import { categoryStyles } from "../data/events.js";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function toKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
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

  const firstOfMonth = monthCursor;
  const startOffset = firstOfMonth.getDay();
  const daysInMonth = new Date(
    firstOfMonth.getFullYear(),
    firstOfMonth.getMonth() + 1,
    0
  ).getDate();

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth(), d));
  }

  const todayKey = toKey(new Date());

  return (
    <div className="rounded-2xl border border-line bg-paper p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-bold text-ink">{monthLabel}</h3>
        <div className="flex gap-1.5">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() =>
              setMonthCursor(
                (m) => new Date(m.getFullYear(), m.getMonth() - 1, 1)
              )
            }
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink/60 hover:border-ink hover:text-ink"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() =>
              setMonthCursor(
                (m) => new Date(m.getFullYear(), m.getMonth() + 1, 1)
              )
            }
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink/60 hover:border-ink hover:text-ink"
          >
            ›
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase text-ink/35">
        {WEEKDAYS.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} className="aspect-square" />;
          const key = toKey(date);
          const dayEvents = eventsByDay.get(key) ?? [];
          const isSelected = selectedDate === key;
          const isToday = key === todayKey;

          return (
            <button
              type="button"
              key={key}
              onClick={() => onSelectDate(dayEvents.length ? key : null)}
              disabled={!dayEvents.length}
              className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-lg text-sm transition-colors ${
                isSelected
                  ? "bg-ink text-paper"
                  : dayEvents.length
                  ? "font-semibold text-ink hover:bg-cloud"
                  : "text-ink/30"
              } ${isToday && !isSelected ? "ring-1 ring-rose" : ""}`}
            >
              {date.getDate()}
              {dayEvents.length > 0 && (
                <span className="flex gap-0.5">
                  {dayEvents.slice(0, 3).map((e, idx) => (
                    <span
                      key={idx}
                      className={`h-1 w-1 rounded-full ${
                        isSelected
                          ? "bg-rose"
                          : categoryStyles[e.category]?.dot ?? "bg-ink-soft"
                      }`}
                    />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line pt-4">
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
