"use client";

import { motion } from "framer-motion";
import { ImageSwiper } from "./ImageSwiper";

const galleryImages =
  "/bifold-1.jpg, /bifold-2.jpg, /bifold-3.jpg, /bifold-4.jpg, /bifold-5.jpg, /bifold-6.jpg, /sliding-1.jpg";

export default function Gallery() {
  return (
    <section id="gallery" style={{ background: "#0f1117" }} className="py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#fcaf3b] mb-3">
            Our Work
          </p>
          <h2 className="font-bold text-4xl md:text-5xl text-white leading-tight mb-4">
            Real Installs.
            <br />
            Real Backyards.
          </h2>
          <p className="text-white/50 text-lg max-w-md mx-auto">
            Swipe through our completed installations across Australia.
          </p>
        </motion.div>

        {/* Card Stack + Side Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col lg:flex-row items-center justify-center gap-16"
        >
          {/* ImageSwiper */}
          <div className="flex flex-col items-center gap-6">
            <ImageSwiper
              images={galleryImages}
              cardWidth={500}
              cardHeight={300}
            />
            {/* Swipe hint */}
            <div className="flex items-center gap-3 text-white/40 text-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 8l4 4-4 4M6 8l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Drag left or right to browse</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 8l4 4-4 4M6 8l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Right side text */}
          <div className="max-w-sm text-center lg:text-left">
            <h3 className="font-bold text-2xl text-white mb-4">
              Every install is unique
            </h3>
            <p className="text-white/50 leading-relaxed mb-6">
              From compact courtyards to expansive outdoor entertaining areas,
              our covers are custom-built to suit any space and any spa.
            </p>
            <div className="flex flex-col gap-3">
              {[
                "Custom sized to your spa",
                "Matches your existing deck material",
                "Installed by our Sydney team",
                "Fully operational within the day",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3 text-sm text-white/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#fcaf3b] flex-shrink-0" />
                  {point}
                </div>
              ))}
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full mt-8 transition-all hover:scale-105"
              style={{ background: "#fcaf3b", color: "#0f1117" }}
            >
              Request a Quote
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
