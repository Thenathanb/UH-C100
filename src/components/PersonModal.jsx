import { useEffect } from "react";
import { createPortal } from "react-dom";
import PhotoSlot from "./PhotoSlot.jsx";

export default function PersonModal({ member, onClose, photoPosition = "center" }) {
  useEffect(() => {
    if (!member) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [member, onClose]);

  if (!member) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
      style={{ animation: "page-in 0.25s ease both" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={member.name}
    >
      <div
        className="relative grid w-full max-w-xl grid-cols-1 gap-6 overflow-hidden rounded-3xl bg-paper p-6 shadow-2xl sm:grid-cols-2 sm:p-8"
        style={{ animation: "modal-pop 0.25s ease both" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-ink/10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <PhotoSlot
          src={member.photo}
          alt={member.name}
          label="Photo"
          className="aspect-square rounded-2xl"
          imgClassName={`h-full w-full object-cover ${
            photoPosition === "top" ? "object-top" : "object-center"
          }`}
        />

        <div className="flex flex-col justify-center">
          <h3 className="font-display text-2xl font-extrabold text-ink">
            {member.name}
          </h3>
          <p className="mt-1 text-sm font-bold uppercase tracking-wide text-rose">
            {member.title}
          </p>

          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-paper transition-colors hover:bg-rose"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13z" />
              </svg>
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
