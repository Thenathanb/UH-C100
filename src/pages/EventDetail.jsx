import { Link, useParams } from "react-router-dom";
import EventGallery from "../components/EventGallery.jsx";
import { events, categoryStyles } from "../data/events.js";
import { getEventPhotos } from "../data/eventPhotos.js";

const formatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function EventDetail() {
  const { eventId } = useParams();
  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">
          Event not found
        </h1>
        <Link to="/events" className="mt-4 inline-block text-rose font-semibold">
          ← Back to all events
        </Link>
      </div>
    );
  }

  const cat = categoryStyles[event.category] ?? categoryStyles.general;
  const date = new Date(`${event.date}T00:00:00`);
  const photos = getEventPhotos(event.id);

  return (
    <article>
      <div className="border-b border-line bg-cloud">
        <EventGallery
          photos={photos}
          alt={event.title}
          className="mx-auto h-[55vh] min-h-[320px] max-h-[600px] w-full max-w-4xl"
        />
      </div>
      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        <Link to="/events" className="text-sm font-semibold text-ink/50 hover:text-ink">
          ← All events
        </Link>

        <div className="mt-4 flex items-center gap-3">
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

        <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
          {event.title}
        </h1>
        <p className="mt-2 text-sm font-medium text-ink/50">
          {formatter.format(date)}
          {event.time ? ` · ${event.time}` : ""}
          {event.location ? ` · ${event.location}` : ""}
        </p>

        <div className="mt-8 space-y-4 text-base leading-relaxed text-ink/75">
          {(event.body?.length ? event.body : [event.summary]).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
