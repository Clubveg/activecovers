"use client";

import { useState } from "react";
import Image from "next/image";

const bifoldImages = [
  "/bifold-1.jpg",
  "/bifold-2.jpg",
  "/bifold-3.jpg",
  "/bifold-4.jpg",
  "/bifold-5.jpg",
  "/bifold-6.jpg",
];

const bifold = {
  name: "Hydraulic Bi-Fold Cover",
  tag: "Most Popular",
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

export default function Products() {
  const [activeImg, setActiveImg] = useState(0);

  const prev = () => setActiveImg((i) => (i - 1 + bifoldImages.length) % bifoldImages.length);
  const next = () => setActiveImg((i) => (i + 1) % bifoldImages.length);

  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16 max-w-xl">
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
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* ── Bi-Fold Card ── */}
          <div className="group relative rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all hover:shadow-2xl hover:-translate-y-1 bg-[#f8f9fa]">
            <div className="h-1.5 w-full bg-[#fcaf3b]" />

            {/* Image Gallery */}
            <div className="relative w-full aspect-video bg-gray-200 overflow-hidden">
              <Image
                src={bifoldImages[activeImg]}
                alt={`Hydraulic Bi-Fold Cover ${activeImg + 1}`}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Arrows */}
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all"
                aria-label="Previous image"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all"
                aria-label="Next image"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Counter */}
              <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full">
                {activeImg + 1} / {bifoldImages.length}
              </div>

              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {bifoldImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeImg ? "bg-white scale-125" : "bg-white/50"}`}
                  />
                ))}
              </div>
            </div>

            <div className="p-8 md:p-10 flex flex-col gap-6">
              <div>
                <span className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3 bg-[#fcaf3b20] text-[#fcaf3b]">
                  {bifold.tag}
                </span>
                <h3 className="font-bold text-2xl text-[#0f1117]">{bifold.name}</h3>
              </div>
              <p className="text-gray-500 leading-relaxed">{bifold.description}</p>
              <ul className="flex flex-col gap-2.5">
                {bifold.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#fcaf3b]" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full transition-all hover:scale-105 bg-[#fcaf3b] text-[#0f1117]"
                >
                  Request a Quote
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── Sliding Cover Card ── */}
          <div className="group relative rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all hover:shadow-2xl hover:-translate-y-1 bg-[#f8f9fa]">
            <div className="h-1.5 w-full bg-[#64748b]" />

            {/* Photo placeholder */}
            <div className="relative w-full aspect-video bg-[#1a1f2e] flex flex-col items-center justify-center gap-3">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-white/20">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-white/40 text-sm font-medium tracking-wide">Photos Coming Soon</span>
            </div>

            <div className="p-8 md:p-10 flex flex-col gap-6">
              <div>
                <span className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3 bg-[#64748b20] text-[#64748b]">
                  {sliding.tag}
                </span>
                <h3 className="font-bold text-2xl text-[#0f1117]">{sliding.name}</h3>
              </div>
              <p className="text-gray-500 leading-relaxed">{sliding.description}</p>
              <ul className="flex flex-col gap-2.5">
                {sliding.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#64748b]" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full transition-all hover:scale-105 bg-[#64748b] text-white"
                >
                  Request a Quote
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
