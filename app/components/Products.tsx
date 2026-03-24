const products = [
  {
    name: "Hydraulic Bi-Fold Cover",
    tag: "Most Popular",
    description:
      "Our signature product. The bi-fold design opens effortlessly with a hydraulic assist, folding neatly to the side to give you full, unobstructed access to your swim spa.",
    features: [
      "Hydraulic gas strut mechanism",
      "Available in 4.5m × 2.3m and 6.0m × 2.3m",
      "Custom sizing available",
      "Transforms your outdoor space",
      "Low maintenance aluminium frame",
    ],
    accent: "#fcaf3b",
  },
  {
    name: "Sliding Cover",
    tag: "Space Saving",
    description:
      "Engineered for backyards where space is at a premium. The sliding mechanism glides smoothly to one side, requiring minimal clearance while still delivering full spa access.",
    features: [
      "Smooth sliding rail system",
      "Minimal side clearance needed",
      "Ideal for enclosed areas",
      "Custom sized to your spa",
      "Durable all-weather construction",
    ],
    accent: "#64748b",
  },
];

export default function Products() {
  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 max-w-xl">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#fcaf3b] mb-3">
            Our Products
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[#0f1117] leading-tight">
            Covers Built for
            <br />
            Australian Backyards
          </h2>
          <p className="mt-4 text-lg text-gray-500 leading-relaxed">
            Every cover is custom-manufactured at our Sydney facility and
            installed by our expert team.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((p) => (
            <div
              key={p.name}
              className="group relative rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all hover:shadow-2xl hover:-translate-y-1"
              style={{ background: "#f8f9fa" }}
            >
              {/* Top colour bar */}
              <div className="h-1.5 w-full" style={{ background: p.accent }} />

              <div className="p-8 md:p-10 flex flex-col gap-6">
                {/* Tag + name */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3"
                      style={{ background: p.accent + "20", color: p.accent }}
                    >
                      {p.tag}
                    </span>
                    <h3 className="font-display font-bold text-2xl text-[#0f1117]">{p.name}</h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-500 leading-relaxed">{p.description}</p>

                {/* Features */}
                <ul className="flex flex-col gap-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: p.accent }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="flex gap-3 pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full transition-all hover:scale-105"
                    style={{ background: p.accent, color: p.accent === "#fcaf3b" ? "#0f1117" : "#fff" }}
                  >
                    Request a Quote
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 font-medium text-sm px-6 py-3 rounded-full border border-gray-200 hover:border-gray-300 text-gray-600 transition-all"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
