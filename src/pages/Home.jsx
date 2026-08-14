import { Link } from "react-router-dom";
import PhotoSlot from "../components/PhotoSlot.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import EventCard from "../components/EventCard.jsx";
import Reveal from "../components/Reveal.jsx";
import Marquee from "../components/Marquee.jsx";
import PillarCard from "../components/PillarCard.jsx";
import { site } from "../data/site.js";
import { events, sortByDateAsc } from "../data/events.js";

const recentEvents = sortByDateAsc(
  events.filter((e) => e.status === "past")
).reverse();

const marqueeItems = [
  "Mentoring",
  "Education",
  "Health & Wellness",
  "Economic Development",
  "Leadership",
  "Service",
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <PhotoSlot
          src="/images/hero.jpg"
          alt={`${site.chapterName} members at a chapter event`}
          label="Hero photo: strong group/event shot"
          className="h-[68vh] min-h-[480px] w-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/10" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 mix-blend-soft-light"
          style={{
            backgroundImage:
              "radial-gradient(60% 50% at 20% 100%, var(--color-rose) 0%, transparent 60%)",
            backgroundSize: "200% 200%",
            animation: "moveGradient 15s ease infinite",
          }}
        />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-5 pb-14 lg:px-8 lg:pb-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-paper/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-rose backdrop-blur-sm">
              {site.university} · {site.chapterNickname} Chapter
            </span>
            <h1 className="mt-4 max-w-2xl font-display font-extrabold text-paper">
              <span className="typewriter-line text-base font-semibold text-paper/70 sm:text-lg">
                Welcome to
              </span>
              <span className="typewriter-line text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                Collegiate 100
              </span>
              <span className="typewriter-line text-base font-semibold text-rose sm:text-lg">
                {site.chapterNickname} Chapter
                <span aria-hidden="true" className="ml-1 inline-block h-[1em] w-[2px] animate-blink bg-rose align-middle" />
              </span>
            </h1>
            <p
              className="mt-4 max-w-xl text-base text-paper/80 sm:text-lg"
              style={{ animation: "page-in 0.6s ease 2.1s both" }}
            >
              {site.tagline}
            </p>
            <div
              className="mt-8 flex flex-wrap gap-3"
              style={{ animation: "page-in 0.6s ease 2.3s both" }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full bg-rose px-6 py-3 text-sm font-bold text-paper transition-transform hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center rounded-full border border-paper/30 bg-paper/10 px-6 py-3 text-sm font-bold text-paper backdrop-blur-sm transition-colors hover:bg-paper/20"
              >
                Upcoming Events
              </Link>
            </div>
          </div>
        </div>

        <a
          href="#mission"
          aria-label="Scroll to mission"
          className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 animate-bounce-soft text-paper/70 hover:text-paper sm:block"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </section>

      {/* Marquee strip */}
      <div className="border-b border-line bg-ink py-3 text-paper">
        <Marquee items={marqueeItems} />
      </div>

      {/* Mission */}
      <section id="mission" className="scroll-mt-20 border-b border-line bg-cloud">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
          <Reveal variant="up">
            <SectionHeading
              eyebrow="Our Mission"
              title="Developing student leaders. Elevating Houston's youth."
              align="center"
            />
          </Reveal>
          <Reveal variant="up" delay={100}>
            <p className="mx-auto mt-6 max-w-3xl text-center text-base leading-relaxed text-ink/65 sm:text-lg">
              {site.mission}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
        <Reveal variant="up">
          <SectionHeading
            eyebrow="Four Pillars"
            title="What we stand on"
            description="Every event, workshop, and mentoring session we run ladders up to one of these four pillars."
            align="center"
          />
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {site.pillars.map((pillar, i) => (
            <PillarCard key={pillar.name} pillar={pillar} index={i} delay={i * 90} />
          ))}
        </div>
      </section>

      {/* Impact: internships */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <Reveal variant="left">
              <div>
                <SectionHeading
                  eyebrow="Real Outcomes"
                  title="25+ members. Real internship offers."
                  description="Through resume workshops, mock interviews, and recruiter networking, Collegiate 100 members have landed internships at companies like Morgan Stanley, JPMorgan, Halliburton, Lenovo, and Northwestern Mutual."
                />
                <div className="mt-8 flex items-baseline gap-3">
                  <span className="font-display text-6xl font-extrabold text-rose">
                    25+
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-wide text-ink/50">
                    Members with internships
                  </span>
                </div>
                <Link
                  to="/about"
                  className="mt-8 inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-bold text-ink hover:border-ink"
                >
                  See how we prep members →
                </Link>
              </div>
            </Reveal>
            <Reveal variant="right">
              <PhotoSlot
                src="/images/interns.jpg"
                alt="Collegiate 100 internship spotlight collage featuring 25+ members and the companies they interned with"
                label="Internship spotlight collage"
                className="mx-auto flex max-h-[600px] w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl shadow-lg shadow-ink/10"
                imgClassName="h-full w-full object-contain"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Recent highlights */}
      <section className="border-t border-line bg-cloud">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal variant="up">
              <SectionHeading
                eyebrow="Recent Highlights"
                title="What Clutch City's been up to"
              />
            </Reveal>
            <Reveal variant="up" delay={100}>
              <Link
                to="/events"
                className="text-sm font-bold text-rose hover:text-ink"
              >
                View all events →
              </Link>
            </Reveal>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {recentEvents.map((event, i) => (
              <Reveal key={event.id} variant="up" delay={i * 100}>
                <EventCard event={event} featured />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why join */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <Reveal variant="left">
            <PhotoSlot
              src="/images/why-join.jpg"
              alt="Collegiate 100 members at a chapter event"
              label="Members / event photo"
              className="aspect-[4/3] rounded-2xl"
            />
          </Reveal>
          <Reveal variant="right">
            <div>
              <SectionHeading
                eyebrow="Why Join"
                title="Lead. Mentor. Grow. With a community behind you."
                description="Collegiate 100 gives you real mentoring experience, a leadership track record, a professional network, and a community of peers building toward the same goal: lifting up Houston's next generation."
              />
              <ul className="mt-6 space-y-3 text-sm text-ink/70">
                {[
                  "Direct mentoring experience with Houston-area youth",
                  "Leadership roles and resume-ready involvement",
                  "Professional development and networking events",
                  "A built-in community across UH and the national C100 network",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-bold text-paper transition-colors hover:bg-rose"
                >
                  Contact Us
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-bold text-ink hover:border-ink"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative overflow-hidden bg-ink">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(50% 60% at 50% 20%, var(--color-rose) 0%, transparent 65%)",
            backgroundSize: "200% 200%",
            animation: "moveGradient 15s ease infinite",
          }}
        />
        <Reveal variant="scale">
          <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-16 text-center lg:px-8">
            <h2 className="font-display text-3xl font-extrabold text-paper sm:text-4xl">
              Ready to serve, lead, and grow with Clutch City?
            </h2>
            <p className="max-w-xl text-paper/70">{site.meetingSchedule}</p>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full bg-rose px-7 py-3.5 text-sm font-bold text-paper transition-transform hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
