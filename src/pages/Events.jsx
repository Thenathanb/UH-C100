import { useMemo, useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import EventCard from "../components/EventCard.jsx";
import EventCalendar from "../components/EventCalendar.jsx";
import EventRecapCard from "../components/EventRecapCard.jsx";
import Reveal from "../components/Reveal.jsx";
import { events, sortByDateAsc, categoryStyles } from "../data/events.js";
import { getEventPhotos } from "../data/eventPhotos.js";

const FILTERS = ["all", ...Object.keys(categoryStyles)];

export default function Events() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [filter, setFilter] = useState("all");

  const past = sortByDateAsc(events.filter((e) => e.status === "past")).reverse();

  // Recap gallery: only past events that actually have photos dropped in —
  // never render a placeholder/blank recap for one that doesn't yet.
  const pastWithPhotos = useMemo(
    () => past.filter((e) => getEventPhotos(e.id).length > 0),
    [past]
  );

  const visible = useMemo(() => {
    let list = sortByDateAsc(events).reverse();
    if (selectedDate) list = list.filter((e) => e.date === selectedDate);
    if (filter !== "all") list = list.filter((e) => e.category === filter);
    return list;
  }, [selectedDate, filter]);

  return (
    <div>
      <section className="border-b border-line bg-cloud">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-18">
          <Reveal variant="up">
            <SectionHeading
              eyebrow="Calendar"
              title="Events"
              description="Everything Collegiate 100 at UH has planned, and everything we've already pulled off. Tap an event on the calendar to open it, or filter the full list below."
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
        <Reveal variant="up">
          <SectionHeading eyebrow="Schedule" title="Event Calendar" />
        </Reveal>

        <Reveal variant="up" delay={100} className="mt-8">
          <EventCalendar
            events={events}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </Reveal>

        <div className="mt-14">
          <Reveal variant="up">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                      filter === f
                        ? "border-ink bg-ink text-paper"
                        : "border-line text-ink/60 hover:border-ink"
                    }`}
                  >
                    {f === "all" ? "All" : categoryStyles[f].label}
                  </button>
                ))}
              </div>
              {selectedDate && (
                <button
                  type="button"
                  onClick={() => setSelectedDate(null)}
                  className="text-xs font-semibold text-rose hover:text-ink"
                >
                  Clear date filter ×
                </button>
              )}
            </div>
          </Reveal>

          {visible.length ? (
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((event, i) => (
                <Reveal key={event.id} variant="up" delay={Math.min(i, 8) * 60}>
                  <EventCard event={event} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-sm text-ink/50">
              No events match those filters yet.
            </p>
          )}
        </div>
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
