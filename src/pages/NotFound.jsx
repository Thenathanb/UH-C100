import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-5 py-32 text-center">
      <span className="font-display text-6xl font-extrabold text-rose">404</span>
      <h1 className="font-display text-2xl font-bold text-ink">Page not found</h1>
      <p className="text-sm text-ink/60">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-bold text-paper"
      >
        Back home
      </Link>
    </div>
  );
}
