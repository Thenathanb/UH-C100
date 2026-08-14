import { Link } from "react-router-dom";
import { PlaceholderBox } from "./PhotoSlot.jsx";
import { categoryStyles } from "../data/events.js";
import { getEventPhotos } from "../data/eventPhotos.js";
import { useTilt } from "../hooks/useTilt.js";

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default function EventCard({ event, featured = false }) {
  const cat = categoryStyles[event.category] ?? categoryStyles.general;
  const date = new Date(`${event.date}T00:00:00`);
  const { ref, onMouseMove, onMouseLeave } = useTilt(5);
  const photos = getEventPhotos(event.id);

  return (
    <Link
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      to={`/events/${event.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-[transform,box-shadow] duration-200 will-change-transform hover:shadow-lg hover:shadow-ink/5"
    >
      <div className={`relative overflow-hidden bg-cloud ${featured ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
        {photos.length > 0 ? (
          <img
            src={photos[0]}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <PlaceholderBox label="Event photo" />
        )}
        {photos.length > 1 && (
          <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-ink/60 px-2 py-1 text-[11px] font-bold text-paper backdrop-blur-sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="9" cy="10" r="1.5" fill="currentColor" />
              <path d="m5 17 5-5 3.5 3.5L18 11l1.999 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {photos.length}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide ${cat.text}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${cat.dot}`} />
            {cat.label}
          </span>
          {event.status === "upcoming" && (
            <span className="rounded-full bg-rose-soft px-2.5 py-0.5 text-[11px] font-bold text-ink">
              Upcoming
            </span>
          )}
        </div>
        <h3 className="font-display text-lg font-bold leading-snug text-ink group-hover:text-rose">
          {event.title}
        </h3>
        <p className="text-sm text-ink/55">
          {formatter.format(date)}
          {event.location ? ` · ${event.location}` : ""}
        </p>
        {event.summary && (
          <p className="line-clamp-3 text-sm leading-relaxed text-ink/60">
            {event.summary}
          </p>
        )}
      </div>
    </Link>
  );
}
