const reasons = [
  {
    title: "Custom Made for Your Spa",
    description:
      "No off-the-shelf products here. Every cover is measured and manufactured specifically for your swim spa model and dimensions.",
    icon: "📐",
  },
  {
    title: "Hydraulic Precision",
    description:
      "Our hydraulic gas strut mechanism means the cover opens and closes with minimal effort — even in tight spaces.",
    icon: "⚙️",
  },
  {
    title: "5-Year Warranty",
    description:
      "We back every cover with a comprehensive 5-year warranty. 100% coverage for the first 2 years, 50% years 3–5.",
    icon: "🛡️",
  },
  {
    title: "30+ Years Experience",
    description:
      "Founded in 1992 by Yacoub and his son Sam, Active Covers has been perfecting the swim spa cover for over three decades.",
    icon: "🏆",
  },
  {
    title: "Personal Project Manager",
    description:
      "From your first call to installation day, you'll have a dedicated contact who knows your project inside and out.",
    icon: "👷",
  },
  {
    title: "Fast 4-Week Turnaround",
    description:
      "We know you can't wait to enjoy your spa. Our efficient Sydney manufacturing gets your cover to you in just 4 weeks.",
    icon: "📅",
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
        <div className="mb-16 max-w-xl">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#fcaf3b] mb-3">
            Why Active Covers
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight">
            The Details That
            <br />
            Make the Difference
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="group rounded-2xl p-8 border transition-all hover:border-[#fcaf3b]/30 hover:-translate-y-0.5"
              style={{
                background: "#1a1f2e",
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <div className="text-3xl mb-4">{r.icon}</div>
              <h3 className="font-display font-bold text-lg text-white mb-3">
                {r.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                {r.description}
              </p>
            </div>
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
