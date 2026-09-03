import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading.jsx";
import PhotoSlot from "../components/PhotoSlot.jsx";
import Reveal from "../components/Reveal.jsx";
import TiltCard from "../components/TiltCard.jsx";
import { site } from "../data/site.js";

export default function About() {
  return (
    <div>
      <section className="border-b border-line bg-cloud">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-18">
          <Reveal variant="up">
            <SectionHeading
              eyebrow="About Us"
              title="Who we are"
              description={site.mission}
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
        <Reveal variant="up">
          <SectionHeading
            eyebrow="Four Pillars"
            title="How we deliver on our mission"
            align="center"
          />
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {site.pillars.map((pillar, i) => (
            <Reveal key={pillar.name} variant="up" delay={i * 90}>
              <TiltCard maxTilt={4} className="flex gap-4 rounded-2xl border border-line bg-paper p-6 hover:shadow-lg hover:shadow-ink/5">
                <span className="font-display text-3xl font-extrabold text-rose">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">
                    {pillar.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60">
                    {pillar.description}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-cloud">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <Reveal variant="left">
              <PhotoSlot
                src="/images/interns.jpg"
                alt="Collegiate 100 internship spotlight collage featuring 25+ members and the companies they interned with"
                label="Internship spotlight collage"
                className="mx-auto flex max-h-[600px] w-full max-w-md items-center justify-center overflow-hidden rounded-2xl shadow-lg shadow-ink/10"
                imgClassName="h-full w-full object-contain"
              />
            </Reveal>
            <Reveal variant="right">
              <div>
                <SectionHeading
                  eyebrow="Why Join"
                  title="What membership gets you"
                  description="Beyond mentoring and service, Collegiate 100 invests real time in your career: resume workshops, mock interviews, and recruiter networking that our members have turned into actual internship offers."
                />
                <ul className="mt-6 space-y-3 text-sm text-ink/70">
                  {[
                    "Direct, structured mentoring experience with Houston-area youth",
                    "Leadership pipeline: committee and exec board opportunities",
                    "Professional development: resume reviews, mock interviews, and recruiter networking events",
                    "25+ members have landed internships at companies like Morgan Stanley, JPMorgan, Halliburton, Lenovo, and Northwestern Mutual",
                    "Access to the national Collegiate 100 / 100 Black Men of America network",
                    "A tight-knit community of driven UH students",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
        <Reveal variant="up">
          <SectionHeading eyebrow="Membership" title="Requirements & involvement" />
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            { title: "Requirements", body: (
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/60">
                {site.membership.requirements.map((r) => (
                  <li key={r}>• {r}</li>
                ))}
              </ul>
            ) },
            { title: "Dues", body: (
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                {site.membership.dues}
              </p>
            ) },
            { title: "Involvement points", body: (
              <p className="mt-3 text-sm leading-relaxed text-ink/60">
                {site.membership.pointsSystemNote}
              </p>
            ) },
          ].map((card, i) => (
            <Reveal key={card.title} variant="up" delay={i * 90}>
              <TiltCard maxTilt={4} className="h-full rounded-2xl border border-line bg-paper p-6 hover:shadow-lg hover:shadow-ink/5">
                <h3 className="font-display text-base font-bold text-ink">
                  {card.title}
                </h3>
                {card.body}
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal variant="scale">
          <div className="mt-10 flex justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-paper transition-colors hover:bg-rose"
            >
              Contact Us
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
