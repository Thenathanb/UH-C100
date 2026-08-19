import PhotoSlot from "./PhotoSlot.jsx";
import Reveal from "./Reveal.jsx";

/**
 * Full-bleed portrait photo card with name/title overlaid via a gradient,
 * modeled on colorstackosu.org/execboard's card treatment.
 */
export default function ExecCard({ member, delay = 0, onClick }) {
  const interactive = Boolean(onClick);
  const Tag = interactive ? "button" : "div";

  return (
    <Reveal variant="up" delay={delay}>
      <Tag
        type={interactive ? "button" : undefined}
        onClick={onClick}
        aria-label={interactive ? `View ${member.name}'s LinkedIn` : undefined}
        className={`group relative block aspect-[3/4] w-full overflow-hidden rounded-xl border-0 bg-ink text-left transition-all duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose ${
          interactive ? "cursor-pointer hover:-translate-y-1 hover:shadow-2xl" : ""
        }`}
      >
        <div className="absolute inset-0">
          <PhotoSlot
            src={member.photo}
            alt={member.name}
            label="Photo"
            className="h-full w-full"
            imgClassName={`h-full w-full object-cover object-top transition-transform duration-700 ease-out ${
              interactive ? "group-hover:scale-105" : ""
            }`}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />

        {interactive && (
          <div className="pointer-events-none absolute bottom-0 left-0 h-0 w-[3px] bg-rose transition-all duration-500 ease-out group-hover:h-full" />
        )}

        <div className="absolute inset-x-0 bottom-0 translate-y-0.5 p-4 transition-transform duration-300 ease-out group-hover:translate-y-0">
          <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-widest text-paper/70">
            {member.title}
          </p>
          <h3 className="font-display text-base font-semibold leading-tight text-paper">
            {member.name}
          </h3>
        </div>
      </Tag>
    </Reveal>
  );
}
