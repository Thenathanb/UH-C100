import { useState } from "react";
import SectionHeading from "../components/SectionHeading.jsx";
import { site } from "../data/site.js";

const socials = [
  { label: "Instagram", href: site.instagramUrl },
  { label: "LinkedIn", href: site.linkedinUrl },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website inquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
    window.location.href = `mailto:${site.contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div>
      <section className="border-b border-line bg-cloud">
        <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-18">
          <SectionHeading
            eyebrow="Get In Touch"
            title="Contact us"
            description="Questions about membership, partnerships, or an event? Send us a note."
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h3 className="font-display text-lg font-bold text-ink">
              Reach out directly
            </h3>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-2 block text-sm font-semibold text-rose"
            >
              {site.contactEmail}
            </a>

            <h3 className="mt-8 font-display text-lg font-bold text-ink">
              Follow along
            </h3>
            <div className="mt-3 flex flex-col gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-ink/60 hover:text-ink"
                >
                  {s.label}
                </a>
              ))}
            </div>

            <h3 className="mt-8 font-display text-lg font-bold text-ink">
              Want to join?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">
              Send us a message using the form or email us directly, and
              we'll get you the details on getting involved.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-line bg-paper p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
                Name
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm font-normal text-ink outline-none focus:border-ink"
                  placeholder="Jane Doe"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm font-normal text-ink outline-none focus:border-ink"
                  placeholder="jane@cougarnet.uh.edu"
                />
              </label>
            </div>
            <label className="mt-5 flex flex-col gap-1.5 text-sm font-semibold text-ink">
              Message
              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="resize-none rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm font-normal text-ink outline-none focus:border-ink"
                placeholder="How can we help?"
              />
            </label>
            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-bold text-paper transition-colors hover:bg-rose sm:w-auto"
            >
              Send Message
            </button>
            <p className="mt-3 text-xs text-ink/40">
              Opens your email client addressed to {site.contactEmail}. TODO:
              swap for a form service (e.g. Formspree) if you'd rather not
              rely on mailto.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
