import { useState } from "react";

export default function Logo({ className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={`font-display font-extrabold tracking-tight ${className}`}>
        <span className="text-ink">Collegiate</span>
        <span className="text-rose"> 100</span>
      </span>
    );
  }

  return (
    <img
      src="/images/logo.jpg"
      alt="Collegiate 100 at University of Houston, Clutch City chapter"
      onError={() => setFailed(true)}
      className={`rounded-full ${className}`}
    />
  );
}
