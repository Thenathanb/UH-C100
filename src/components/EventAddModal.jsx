import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { categoryStyles } from "../data/events.js";
import { getEventPhotos } from "../data/eventPhotos.js";
import { getEventTimeRange, googleCalendarUrl, downloadIcs } from "../lib/calendarLinks.js";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});
const timeFormatter = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });

export default function EventAddModal({ event, onClose }) {
  useEffect(() => {
    if (!event) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [event, onClose]);

  if (!event) return null;

  const cat = categoryStyles[event.category] ?? categoryStyles.general;
  const { allDay, start, end } = getEventTimeRange(event);
  const hasPhotos = getEventPhotos(event.id).length > 0;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
      style={{ animation: "page-in 0.25s ease both" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={event.title}
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-paper p-6 shadow-2xl"
        style={{ animation: "modal-pop 0.25s ease both" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-ink/10"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide ${cat.text}`}>
          <span className={`h-2 w-2 rounded-full ${cat.dot}`} />
          {cat.label}
        </span>
        <h3 className="mt-2 pr-6 font-display text-lg font-bold leading-snug text-ink">
          {event.title}
        </h3>
        <p className="mt-1 text-sm text-ink/60">
          {dateFormatter.format(start)}
          {!allDay && ` · ${timeFormatter.format(start)} – ${timeFormatter.format(end)}`}
        </p>
        {event.location && <p className="text-sm text-ink/60">{event.location}</p>}

        <div className="mt-5 flex flex-col gap-2">
          <a
            href={googleCalendarUrl(event)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-paper transition-colors hover:bg-rose"
          >
            Add to Google Calendar
          </a>
          <button
            type="button"
            onClick={() => downloadIcs(event)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:border-ink"
          >
            Add to Apple Calendar
          </button>
        </div>

        {hasPhotos && (
          <Link
            to={`/events/${event.id}`}
            className="mt-4 block text-center text-sm font-semibold text-rose hover:text-ink"
          >
            View photo recap →
          </Link>
        )}
      </div>
    </div>,
    document.body
  );
}
