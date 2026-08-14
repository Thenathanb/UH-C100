import { useState } from "react";

/** The "no image here yet" look, shared by PhotoSlot and anything that already
 * knows at render time there's no photo (e.g. an empty event photo folder). */
export function PlaceholderBox({ label, hint, className = "" }) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-ink/15 bg-gradient-to-br from-cloud to-line/60 p-4 text-center ${className}`}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-ink/25">
        <path
          d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="9" cy="10" r="1.75" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="m5 17 5-5 3.5 3.5L18 11l1.999 2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[11px] font-semibold uppercase tracking-wide text-ink/40">
        {label || "Add photo"}
      </span>
      {hint && (
        <span className="max-w-[85%] break-all text-[10px] text-ink/30">{hint}</span>
      )}
    </div>
  );
}

/**
 * Renders a real photo if it exists at `src`. If the file is missing (404),
 * falls back to a labeled placeholder instead of a broken image icon.
 * Drop a real file at the given `src` path (same name) and it appears automatically.
 */
export default function PhotoSlot({
  src,
  alt,
  label,
  className = "",
  imgClassName = "h-full w-full object-cover",
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-cloud ${className}`}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className={imgClassName}
        />
      ) : (
        <PlaceholderBox label={label} hint={src} />
      )}
    </div>
  );
}
