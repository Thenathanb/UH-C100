import { useMemo, useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import EventCard from "../components/EventCard.jsx";
import EventCalendar from "../components/EventCalendar.jsx";
import Reveal from "../components/Reveal.jsx";
import { events, sortByDateAsc, categoryStyles } from "../data/events.js";
import { getEventPhotos } from "../data/eventPhotos.js";

const FILTERS = ["all", ...Object.keys(categoryStyles)];

export default function Events() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [filter, setFilter] = useState("all");

  const upcoming = sortByDateAsc(events.filter((e) => e.status === "upcoming"));
  const upNext = upcoming.slice(0, 6);
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
              description="Everything Collegiate 100 at UH has planned, and everything we've already pulled off. Tap a highlighted date to filter below."
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
        <Reveal variant="up">
          <SectionHeading eyebrow="Schedule" title="Event Calendar" align="left" />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[360px_1fr]">
          <div className="flex flex-col gap-6">
            <Reveal variant="left">
              <EventCalendar
                events={events}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </Reveal>
            {upNext.length > 0 && (
              <Reveal variant="left" delay={100}>
                <div className="rounded-2xl border border-line bg-paper p-5">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink/50">
                    Up next
                  </h3>
                  <ul className="mt-3 space-y-3">
                    {upNext.map((e) => (
                      <li key={e.id} className="text-sm">
                        <p className="font-semibold text-ink">{e.title}</p>
                        <p className="text-ink/50">
                          {new Date(`${e.date}T00:00:00`).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                          {e.time ? ` · ${e.time}` : ""}
                        </p>
                      </li>
                    ))}
                  </ul>
                  {upcoming.length > upNext.length && (
                    <p className="mt-3 text-xs text-ink/40">
                      +{upcoming.length - upNext.length} more on the calendar
                    </p>
                  )}
                </div>
              </Reveal>
            )}
          </div>

          <div>
            <Reveal variant="right">
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
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                <Reveal key={event.id} variant="up" delay={i * 80}>
                  <EventCard event={event} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
