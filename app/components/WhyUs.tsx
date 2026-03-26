"use client";
import { motion } from "framer-motion";

const icons: Record<string, React.ReactNode> = {
  custom: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fcaf3b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  hydraulic: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fcaf3b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  ),
  warranty: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fcaf3b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  experience: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fcaf3b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  manager: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fcaf3b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  turnaround: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fcaf3b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12H19M15 6l6 6-6 6" />
    </svg>
  ),
};

const reasons = [
  {
    title: "Custom Made for Your Spa",
    description:
      "No off-the-shelf products here. Every cover is measured and manufactured specifically for your swim spa model and dimensions.",
    icon: "custom",
  },
  {
    title: "Hydraulic Precision",
    description:
      "Our hydraulic gas strut mechanism means the cover opens and closes with minimal effort — even in tight spaces.",
    icon: "hydraulic",
  },
  {
    title: "5-Year Warranty",
    description:
      "We back every cover with a comprehensive 5-year warranty. 100% coverage for the first 2 years, 50% years 3–5.",
    icon: "warranty",
  },
  {
    title: "30+ Years Experience",
    description:
      "Founded in 1992 by Yacoub and his son Sam, Active Covers has been perfecting the swim spa cover for over three decades.",
    icon: "experience",
  },
  {
    title: "Personal Project Manager",
    description:
      "From your first call to installation day, you'll have a dedicated contact who knows your project inside and out.",
    icon: "manager",
  },
  {
    title: "Fast 6-Week Turnaround",
    description:
      "We know you can't wait to enjoy your spa. Our efficient Sydney manufacturing gets your cover to you in just 6 weeks.",
    icon: "turnaround",
  },
];

export default function WhyUs() {
  return (
    <section
      id="about"
      style={{ background: "#0f1117" }}
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-16 max-w-xl"
        >
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#fcaf3b] mb-3">
            Why Active Covers
          </p>
          <h2 className="font-bold text-4xl md:text-5xl text-white leading-tight">
            The Details That
            <br />
            Make the Difference
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="group rounded-2xl p-8 border transition-all hover:border-[#fcaf3b]/30 hover:-translate-y-0.5"
              style={{
                background: "#1a1f2e",
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(252,175,59,0.1)" }}>
                {icons[r.icon]}
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-3">
                {r.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {r.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-full transition-all hover:scale-105"
            style={{ background: "#fcaf3b", color: "#0f1117" }}
          >
            Get a Free Quote Today
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
