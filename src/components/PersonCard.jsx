import PhotoSlot from "./PhotoSlot.jsx";
import Reveal from "./Reveal.jsx";
import TiltCard from "./TiltCard.jsx";

export default function PersonCard({
  photo,
  name,
  subtitle,
  description,
  delay = 0,
  onClick,
  photoPosition = "center",
  compact = false,
}) {
  return (
    <Reveal variant="up" delay={delay}>
      <TiltCard
        as={onClick ? "button" : "div"}
        type={onClick ? "button" : undefined}
        onClick={onClick}
        maxTilt={5}
        className={`group overflow-hidden rounded-2xl border border-line bg-paper text-left hover:shadow-lg hover:shadow-ink/5 ${
          onClick ? "w-full cursor-pointer" : ""
        }`}
      >
        <PhotoSlot
          src={photo}
          alt={name}
          label="Photo"
          className="aspect-square"
          imgClassName={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            photoPosition === "top" ? "object-top" : "object-center"
          }`}
        />
        <div className={compact ? "p-3" : "p-5"}>
          <h3
            className={`font-display font-bold text-ink ${
              compact ? "text-sm leading-snug" : "text-lg"
            }`}
          >
            {name}
          </h3>
          {subtitle && (
            <p
              className={`font-semibold text-rose ${
                compact ? "text-xs leading-snug" : "text-sm"
              }`}
            >
              {subtitle}
            </p>
          )}
          {description && (
            <p className="mt-2 text-sm leading-relaxed text-ink/60">
              {description}
            </p>
          )}
        </div>
      </TiltCard>
    </Reveal>
  );
}
