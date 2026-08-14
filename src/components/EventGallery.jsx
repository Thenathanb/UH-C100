import { useEffect, useRef, useState } from "react";
import { PlaceholderBox } from "./PhotoSlot.jsx";

/**
 * Swipeable photo gallery for an event's detail page. Backed by native
 * horizontal scroll-snap, so touch/trackpad swipe works with no gesture
 * code — arrows and dots just scroll the track programmatically.
 */
export default function EventGallery({ photos, alt, className = "" }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || photos.length < 2) return;
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setIndex(Math.round(el.scrollLeft / el.clientWidth));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [photos.length]);

  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(photos.length - 1, i));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") goTo(index - 1);
    if (e.key === "ArrowRight") goTo(index + 1);
  };

  if (photos.length === 0) {
    return (
      <div className={`relative overflow-hidden bg-cloud ${className}`}>
        <PlaceholderBox label="Event photos" hint="No photos added yet" />
      </div>
    );
  }

  if (photos.length === 1) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden bg-cloud ${className}`}>
        <img src={photos[0]} alt={alt} className="h-full w-full object-contain" />
      </div>
    );
  }

  return (
    <div
      className={`group relative overflow-hidden bg-cloud outline-none ${className}`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      role="region"
      aria-roledescription="carousel"
      aria-label={alt}
    >
      <div
        ref={trackRef}
        className="flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((src, i) => (
          <div
            key={src}
            className="flex h-full w-full flex-none snap-center items-center justify-center"
          >
            <img
              src={src}
              alt={`${alt} — photo ${i + 1} of ${photos.length}`}
              className="h-full w-full object-contain"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        disabled={index === 0}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 text-paper opacity-0 backdrop-blur-sm transition-opacity hover:bg-ink/70 disabled:pointer-events-none disabled:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 sm:opacity-70"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        disabled={index === photos.length - 1}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 text-paper opacity-0 backdrop-blur-sm transition-opacity hover:bg-ink/70 disabled:pointer-events-none disabled:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 sm:opacity-70"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <span className="absolute right-3 top-3 rounded-full bg-ink/60 px-2.5 py-1 text-xs font-semibold text-paper backdrop-blur-sm">
        {index + 1} / {photos.length}
      </span>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-paper" : "w-1.5 bg-paper/50 hover:bg-paper/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
