import { useMemo } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import EventCalendar from "../components/EventCalendar.jsx";
import EventRecapCard from "../components/EventRecapCard.jsx";
import Reveal from "../components/Reveal.jsx";
import { events, sortByDateAsc } from "../data/events.js";
import { getEventPhotos } from "../data/eventPhotos.js";

export default function Events() {
  const past = sortByDateAsc(events.filter((e) => e.status === "past")).reverse();

  // Recap gallery: only past events that actually have photos dropped in —
  // never render a placeholder/blank recap for one that doesn't yet.
  const pastWithPhotos = useMemo(
    () => past.filter((e) => getEventPhotos(e.id).length > 0),
    [past]
  );

  return (
    <div>
      <section className="border-b border-line bg-cloud">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-18">
          <Reveal variant="up">
            <SectionHeading
              eyebrow="Calendar"
              title="Events"
              description="Everything Collegiate 100 at UH has planned, and everything we've already pulled off. Tap any event on the calendar to add it to your Google or Apple calendar."
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
        <Reveal variant="up">
          <SectionHeading eyebrow="Schedule" title="Event Calendar" />
        </Reveal>

        <Reveal variant="up" delay={100} className="mt-8">
          <EventCalendar events={events} />
        </Reveal>
      </section>

      {/* Gallery: photo recaps of past events — only events with real photos
          uploaded show up here, so this section (and each card in it) never
          renders a blank placeholder. Add photos via src/assets/events/<id>/. */}
      {pastWithPhotos.length > 0 && (
        <section className="border-t border-line bg-cloud">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
            <Reveal variant="up">
              <SectionHeading eyebrow="Gallery" title="Recent Events" />
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastWithPhotos.map((event, i) => (
                <EventRecapCard key={event.id} event={event} delay={i * 80} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
