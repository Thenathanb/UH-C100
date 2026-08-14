import { Link } from "react-router-dom";
import { navLinks, site } from "../data/site.js";
import PhotoSlot from "./PhotoSlot.jsx";

const socials = [
  { label: "Instagram", href: site.instagramUrl },
  { label: "LinkedIn", href: site.linkedinUrl },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-paper/80">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-lg font-bold text-paper">
              {site.chapterName}
            </p>
            <p className="mt-1 text-sm font-semibold text-rose">
              {site.chapterNickname} Chapter
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/60">
              An extension of 100 Black Men of America, Inc., developing
              student leaders through mentoring, education, health &
              wellness, and economic development.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <PhotoSlot
                src="/images/national-logo.svg"
                alt="100 Black Men of America, Inc. logo"
                label="National logo"
                className="h-10 w-10 rounded-md"
              />
              <a
                href={site.nationalOrgUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-paper/50 underline decoration-paper/20 underline-offset-4 hover:text-paper"
              >
                100blackmen.org
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-paper/40">
              Site
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-paper/70 hover:text-paper"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-paper/40">
              Connect
            </p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${site.contactEmail}`}
                  className="text-sm text-paper/70 hover:text-paper"
                >
                  {site.contactEmail}
                </a>
              </li>
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-paper/70 hover:text-paper"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-paper/10 pt-6 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.chapterName}. All rights
            reserved.
          </p>
          <p>Collegiate 100® is a program of 100 Black Men of America, Inc.</p>
        </div>
      </div>
    </footer>
  );
}
