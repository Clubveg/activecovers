"use client";
import { useState } from "react";

// Split to prevent scraping — never stored as a plain string
const phoneParts = ["1300", "50", "26", "50"];
const emailParts = ["info", "activecovers", "com.au"];

// ← Paste your Formspree form ID here after signing up at formspree.io
const FORMSPREE_ID = "xvzvobrw";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const phone = phoneParts.join(" ");
  const email = `${emailParts[0]}@${emailParts[1]}.${emailParts[2]}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#fcaf3b] mb-3">
              Get in Touch
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-[#0f1117] leading-tight mb-6">
              Request Your
              <br />
              Free Quote
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-md">
              Tell us about your swim spa and we&apos;ll get back to you within
              one business day with a tailored quote.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-5">
              {/* Phone — click to reveal */}
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#fcaf3b]/10 group-hover:bg-[#fcaf3b]/20 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fcaf3b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Phone</p>
                  <p className="font-bold text-[#0f1117] group-hover:text-[#fcaf3b] transition-colors">{phone}</p>
                </div>
              </a>

              {/* Email — click to reveal */}
              <div
                className="flex items-center gap-4 group cursor-pointer"
                onClick={() => {
                  if (emailRevealed) window.location.href = `mailto:${email}`;
                  else setEmailRevealed(true);
                }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#fcaf3b]/10 group-hover:bg-[#fcaf3b]/20 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fcaf3b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                  {emailRevealed ? (
                    <p className="font-bold text-[#fcaf3b] transition-colors">{email}</p>
                  ) : (
                    <p className="font-bold text-[#0f1117] group-hover:text-[#fcaf3b] transition-colors">
                      info@active•••••••
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#fcaf3b]/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fcaf3b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Hours</p>
                  <p className="font-bold text-[#0f1117]">Monday – Friday</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="rounded-3xl p-8 md:p-10" style={{ background: "#f8f9fa" }}>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(252,175,59,0.15)" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fcaf3b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-[#0f1117]">Quote request sent!</h3>
                <p className="text-gray-500 text-sm max-w-xs">Thanks — we&apos;ll be in touch within one business day with a tailored quote.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm font-bold text-[#fcaf3b] underline underline-offset-2 mt-2"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Smith"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#fcaf3b] transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="0400 000 000"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#fcaf3b] transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#fcaf3b] transition-colors text-sm"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                      Spa Brand / Model
                    </label>
                    <input
                      type="text"
                      name="spa_model"
                      placeholder="e.g. SwimSpa Pro 6000"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#fcaf3b] transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                      State
                    </label>
                    <select
                      name="state"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-[#fcaf3b] transition-colors text-sm"
                    >
                      <option value="">Select state…</option>
                      {["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your swim spa and any specific requirements…"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#fcaf3b] transition-colors text-sm resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-500 text-center">
                    Something went wrong — please try again or call us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full font-bold py-4 rounded-full transition-all hover:scale-[1.02] active:scale-95 text-[#0f1117] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                  style={{ background: "#fcaf3b" }}
                >
                  {status === "submitting" ? "Sending…" : "Send Quote Request"}
                </button>

                <p className="text-xs text-center text-gray-400">
                  We respond within 1 business day. No obligation.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
