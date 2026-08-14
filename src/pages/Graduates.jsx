import { useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import PersonCard from "../components/PersonCard.jsx";
import PersonModal from "../components/PersonModal.jsx";
import { graduates } from "../data/grads.js";

export default function Graduates() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <section className="border-b border-line bg-cloud">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-18">
          <Reveal variant="up">
            <SectionHeading
              eyebrow="Alumni"
              title="Recent Grads"
              description="Celebrating the Collegiate 100 members who've crossed the stage and are carrying the mission forward. Tap a card for their LinkedIn."
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
        {graduates.map((group) => (
          <div key={group.term} className="mb-14 last:mb-0">
            <Reveal variant="up">
              <h2 className="font-display text-xl font-bold text-ink">
                {group.term}
              </h2>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.people.map((person, i) => (
                <PersonCard
                  key={`${group.term}-${i}`}
                  photo={person.photo}
                  name={person.name}
                  subtitle={person.degree}
                  description={person.whatsNext ? `What's next: ${person.whatsNext}` : undefined}
                  delay={i * 80}
                  photoPosition="top"
                  onClick={
                    person.linkedin
                      ? () =>
                          setSelected({
                            name: person.name,
                            title: person.degree,
                            photo: person.photo,
                            linkedin: person.linkedin,
                          })
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      <PersonModal
        member={selected}
        onClose={() => setSelected(null)}
        photoPosition="top"
      />
    </div>
  );
}
