"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const bifold = {
  name: "Hydraulic Bi-Fold Cover",
  tag: "Most Popular",
  image: "/bifold-2.jpg",
  description:
    "Our signature product. The bi-fold design opens effortlessly with a hydraulic assist, folding neatly back to give you full, unobstructed access to your swim spa — while blending seamlessly into your deck.",
  features: [
    "Hydraulic gas strut mechanism",
    "Suitable for Spas and Pools",
    "Custom sizing available",
    "Flush-fit deck integration",
    "Low maintenance Hot Dip Galvanised steel",
    "All-weather construction",
  ],
};

const sliding = {
  name: "Sliding Cover",
  tag: "Space Saving",
  image: "/sliding-1.jpg",
  description:
    "Engineered for backyards where space is at a premium. The sliding mechanism glides smoothly to one side, requiring minimal clearance while still delivering full spa access.",
  features: [
    "Smooth sliding rail system",
    "Minimal side clearance needed",
    "Ideal for enclosed or narrow areas",
    "Custom sized to your spa",
    "Durable all-weather construction",
    "Low maintenance design",
  ],
};

const products = [
  { ...bifold, accentColor: "#fcaf3b", tagBg: "#fcaf3b20", tagText: "#fcaf3b", btnClass: "bg-[#fcaf3b] text-[#0f1117]", topBar: "bg-[#fcaf3b]" },
  { ...sliding, accentColor: "#64748b", tagBg: "#64748b20", tagText: "#64748b", btnClass: "bg-[#64748b] text-white", topBar: "bg-[#64748b]" },
];

export default function Products() {
  return (
    <section id="products" className="py-24 bg-white">
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
            Our Products
          </p>
          <h2 className="font-bold text-4xl md:text-5xl text-[#0f1117] leading-tight">
            Covers Built for
            <br />
            Australian Backyards
          </h2>
          <p className="mt-4 text-lg text-gray-500 leading-relaxed">
            Every cover is custom-manufactured at our Sydney facility and
            installed by our expert team.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 + 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="group relative rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all hover:shadow-2xl hover:-translate-y-1 bg-[#f8f9fa]"
            >
              <div className={`h-1.5 w-full ${p.topBar}`} />

              {/* Static image */}
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="p-8 md:p-10 flex flex-col gap-6">
                <div>
                  <span
                    className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3"
                    style={{ background: p.tagBg, color: p.tagText }}
                  >
                    {p.tag}
                  </span>
                  <h3 className="font-bold text-2xl text-[#0f1117]">{p.name}</h3>
                </div>
                <p className="text-gray-500 leading-relaxed">{p.description}</p>
                <ul className="flex flex-col gap-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: p.accentColor }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <a
                    href="#contact"
                    className={`inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full transition-all hover:scale-105 ${p.btnClass}`}
                  >
                    Request a Quote
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
