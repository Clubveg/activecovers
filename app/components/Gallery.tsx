"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import Image from "next/image";

const images = [
  { src: "/bifold-1.jpg", alt: "Hydraulic Bi-Fold Cover Installation 1" },
  { src: "/bifold-2.jpg", alt: "Hydraulic Bi-Fold Cover Installation 2" },
  { src: "/bifold-3.jpg", alt: "Hydraulic Bi-Fold Cover Installation 3" },
  { src: "/bifold-4.jpg", alt: "Hydraulic Bi-Fold Cover Installation 4" },
  { src: "/bifold-5.jpg", alt: "Hydraulic Bi-Fold Cover Installation 5" },
  { src: "/bifold-6.jpg", alt: "Hydraulic Bi-Fold Cover Installation 6" },
  { src: "/sliding-1.jpg", alt: "Sliding Cover Installation 1" },
  { src: "/sliding-2.jpg", alt: "Sliding Cover Installation 2" },
  { src: "/sliding-3.jpg", alt: "Sliding Cover Installation 3" },
  { src: "/sliding-4.jpg", alt: "Sliding Cover Installation 4" },
];

function SwipeCard({
  image,
  index,
  total,
  onSwipe,
}: {
  image: { src: string; alt: string };
  index: number;
  total: number;
  onSwipe: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0.3, 1, 0.3]);
  const isDragging = useRef(false);

  const stackOffset = index * 6;
  const stackScale = 1 - index * 0.05;
  const stackY = index * 10;

  if (index > 3) return null;

  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing"
      style={{
        x: index === 0 ? x : 0,
        rotate: index === 0 ? rotate : stackOffset * 1.5 - 4,
        opacity: index === 0 ? opacity : 1 - index * 0.15,
        scale: stackScale,
        y: stackY,
        zIndex: total - index,
        top: 0,
        left: 0,
        right: 0,
      }}
      drag={index === 0 ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragStart={() => { isDragging.current = true; }}
      onDragEnd={(_, info) => {
        isDragging.current = false;
        if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 400) {
          const direction = info.offset.x > 0 ? 1 : -1;
          animate(x, direction * 600, {
            duration: 0.3,
            ease: "easeOut",
            onComplete: onSwipe,
          });
        } else {
          animate(x, 0, { duration: 0.4, ease: "easeOut" });
        }
      }}
    >
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl select-none"
        style={{ width: "320px", height: "420px" }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover pointer-events-none"
          sizes="320px"
          draggable={false}
        />
        {/* Gradient overlay at bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
          }}
        />
        <p className="absolute bottom-4 left-4 text-white text-xs font-medium opacity-80">
          {image.alt}
        </p>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [deck, setDeck] = useState(images);
  const [swiped, setSwiped] = useState(0);

  const handleSwipe = () => {
    setDeck((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
    setSwiped((s) => s + 1);
  };

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

        {/* Card Stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col lg:flex-row items-center justify-center gap-16"
        >
          {/* Stack */}
          <div className="flex flex-col items-center gap-8">
            <div
              className="relative"
              style={{ width: "320px", height: "420px" }}
            >
              {[...deck].reverse().map((img, reversedIndex) => {
                const index = deck.length - 1 - reversedIndex;
                return (
                  <SwipeCard
                    key={`${img.src}-${swiped}`}
                    image={img}
                    index={index}
                    total={deck.length}
                    onSwipe={handleSwipe}
                  />
                );
              })}
            </div>

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

            {/* Counter */}
            <div className="flex gap-1.5">
              {images.map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: i === (swiped % images.length) ? "#fcaf3b" : "rgba(255,255,255,0.2)",
                    transform: i === (swiped % images.length) ? "scale(1.4)" : "scale(1)",
                  }}
                />
              ))}
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
