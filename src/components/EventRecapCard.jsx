import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import { getEventPhotos } from "../data/eventPhotos.js";

const formatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

/**
 * Full-bleed photo card with the event title overlaid via a gradient —
 * same visual language as ExecCard, modeled on colorstackosu.org/events'
 * "Recent Events" gallery. Only ever called for events that already have
 * a photo (see the pastWithPhotos filter in Events.jsx).
 */
export default function EventRecapCard({ event, delay = 0 }) {
  const photo = getEventPhotos(event.id)[0];
  const date = new Date(`${event.date}T00:00:00`);

  return (
    <Reveal variant="up" delay={delay}>
      <Link
        to={`/events/${event.id}`}
        aria-label={`View photos from ${event.title}`}
        className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-ink transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
      >
        <img
          src={photo}
          alt={event.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />

        <div className="pointer-events-none absolute bottom-0 left-0 h-0 w-[3px] bg-rose transition-all duration-500 ease-out group-hover:h-full" />

        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="mb-1 max-h-0 overflow-hidden text-[11px] font-semibold uppercase tracking-widest text-paper/70 opacity-0 transition-all duration-300 ease-out group-hover:mb-1.5 group-hover:max-h-6 group-hover:opacity-100">
            {formatter.format(date)}
          </p>
          <h3 className="font-display text-base font-semibold leading-tight text-paper">
            {event.title}
          </h3>
          <p className="mt-1 max-h-0 overflow-hidden text-xs font-semibold text-rose opacity-0 transition-all duration-300 ease-out group-hover:max-h-6 group-hover:opacity-100">
            View Gallery →
          </p>
        </div>
      </Link>
    </Reveal>
  );
}
