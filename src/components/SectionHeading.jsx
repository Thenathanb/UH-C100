export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}) {
  const alignClass = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignClass}`}>
      {eyebrow && (
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-rose">
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-3xl font-extrabold tracking-tight sm:text-4xl ${
          light ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-base leading-relaxed ${
            light ? "text-paper/70" : "text-ink/60"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
