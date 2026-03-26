"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    // Play then immediately pause — forces browser to buffer & enables seeking
    video.play()
      .then(() => {
        video.pause();
        video.currentTime = 0;
      })
      .catch(() => {});

    const handleScroll = () => {
      const duration = video.duration;
      if (!duration || isNaN(duration)) return;

      const scrolledPast = -section.getBoundingClientRect().top;
      const scrollRange = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolledPast / scrollRange));

      video.currentTime = progress * duration;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={sectionRef} style={{ height: "200vh" }}>

      {/* Sticky full-screen hero */}
      <div className="sticky top-0 overflow-hidden" style={{ height: "100vh" }}>

        {/* VIDEO — full background */}
        <video
          ref={videoRef}
          src="/cover-video.mp4"
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover" }}
          muted
          playsInline
          preload="auto"
        />

        {/* Dark overlay — heavier at top for navbar + text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,13,20,0.85) 0%, rgba(10,13,20,0.55) 50%, rgba(10,13,20,0.75) 100%)",
          }}
        />

        {/* Left-side dark fade so text is crisp */}
        <div
          className="absolute inset-y-0 left-0 w-2/3"
          style={{
            background:
              "linear-gradient(to right, rgba(10,13,20,0.9) 0%, rgba(10,13,20,0.6) 60%, transparent 100%)",
          }}
        />

        {/* TEXT — positioned in lower-left, above the video */}
        <div
          className="hero-text-wrapper absolute inset-0 flex flex-col justify-start md:justify-center overflow-hidden"
          style={{ paddingTop: "108px", paddingBottom: "60px" }}
        >
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl flex flex-col gap-4">

              <div className="inline-flex items-center gap-2 w-fit">
                <div className="w-1.5 h-1.5 rounded-full bg-[#fcaf3b]" />
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#fcaf3b]">
                  Australian Made · Since 1992
                </span>
              </div>

              <h1
                className="font-bold leading-[1.05] tracking-tight text-white"
                style={{ fontSize: "clamp(1.75rem, 5vw, 5rem)" }}
              >
                Transform Your<br />
                Backyard With<br />
                <span style={{ color: "#fcaf3b" }}>Australia&apos;s Best</span><br />
                Swim Spa Cover
              </h1>

              <p className="text-sm md:text-lg leading-relaxed text-white/70 max-w-lg">
                Hydraulic bi-fold covers custom made for your swim spa.
                5 year warranty, 6 week turnaround, personally managed
                from start to finish.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 font-bold px-7 py-4 rounded-full transition-all hover:scale-105 active:scale-95"
                  style={{ background: "#fcaf3b", color: "#0f1117" }}
                >
                  Request Free Quote
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="#products"
                  className="inline-flex items-center font-medium px-7 py-4 rounded-full border transition-all hover:bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}
                >
                  View Products
                </a>
              </div>

              <div className="hero-stats flex gap-10 pt-2">
                {[
                  { value: "30+", label: "Years Experience" },
                  { value: "5 Year", label: "WARRANTY" },
                  { value: "6 Weeks", label: "TURNAROUND" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col gap-0.5">
                    <span className="font-bold text-2xl text-white">{s.value}</span>
                    <span className="text-xs uppercase tracking-wider text-white/40">{s.label}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Scroll hint — bottom centre */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 z-10">
          <span className="text-xs text-white/40 tracking-widest uppercase whitespace-nowrap">
            Scroll to open cover
          </span>
          <div
            className="w-px h-6 animate-bounce mx-auto"
            style={{ background: "linear-gradient(to bottom, rgba(252,175,59,0.6), transparent)" }}
          />
        </div>

      </div>
    </div>
  );
}
