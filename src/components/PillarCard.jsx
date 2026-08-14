import Reveal from "./Reveal.jsx";
import TiltCard from "./TiltCard.jsx";

export default function PillarCard({ pillar, index, delay = 0 }) {
  return (
    <Reveal variant="up" delay={delay}>
      <TiltCard
        maxTilt={6}
        className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-paper p-6 hover:shadow-lg hover:shadow-ink/5"
      >
        <span className="font-display text-2xl font-extrabold text-rose">
          0{index + 1}
        </span>
        <h3 className="font-display text-lg font-bold text-ink">
          {pillar.name}
        </h3>
        <p className="text-sm leading-relaxed text-ink/60">
          {pillar.description}
        </p>
      </TiltCard>
    </Reveal>
  );
}
