export default function Marquee({ items, className = "" }) {
  return (
    <div className={`group overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-4 whitespace-nowrap px-6 text-sm font-bold uppercase tracking-[0.14em]"
          >
            {item}
            <span aria-hidden="true" className="text-rose">
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
