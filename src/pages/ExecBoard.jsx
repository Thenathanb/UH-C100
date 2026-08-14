import { useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import PersonCard from "../components/PersonCard.jsx";
import PersonModal from "../components/PersonModal.jsx";
import { execBoard } from "../data/execBoard.js";

export default function ExecBoard() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <section className="border-b border-line bg-cloud">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-18">
          <Reveal variant="up">
            <SectionHeading
              eyebrow="Leadership"
              title="Exec Board"
              description="The students leading Collegiate 100 at the University of Houston this year. Tap a card for their LinkedIn."
            />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {execBoard.map((member, i) => (
            <PersonCard
              key={member.title}
              photo={member.photo}
              name={member.name}
              subtitle={member.title}
              delay={i * 80}
              onClick={member.linkedin ? () => setSelected(member) : undefined}
            />
          ))}
        </div>
      </section>

      <PersonModal member={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
