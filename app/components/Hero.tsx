"use client";

import { useEffect, useRef } from "react";

const VIDEO_SRC = "/cover-video.mp4";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let target = 0;
    let frame = 0;
    let seekStarted = 0;
    let cancelled = false;
    let objectUrl = "";

    const computeTarget = () => {
      const duration = video.duration;
      if (!duration || isNaN(duration)) return false;
      const scrolledPast = -section.getBoundingClientRect().top;
      const scrollRange = section.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolledPast / scrollRange));
      target = progress * duration;
      return true;
    };

    // Seek toward the scroll position, one seek at a time. A seek still
    // unfinished after 500 ms is treated as lost (Safari can drop them when
    // a tab is suspended) and replaced, so the video can never get stuck.
    const sync = () => {
      frame = 0;
      if (document.hidden || !computeTarget()) return;
      if (video.seeking && performance.now() - seekStarted < 500) {
        frame = requestAnimationFrame(sync);
        return;
      }
      if (Math.abs(video.currentTime - target) > 1 / 30) {
        seekStarted = performance.now();
        video.currentTime = target;
      }
    };
    const requestSync = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };

    // Safari only paints seeked frames once a video has played, and can lose
    // that when a tab is put away, so play-then-pause again on the way back.
    const prime = () => {
      video.play()
        .then(() => {
          video.pause();
          requestSync();
        })
        .catch(() => {});
    };
    const onReturn = () => {
      if (document.hidden) return;
      prime();
      requestSync();
    };

    // Load the whole clip (3 MB) into memory and play it from there, so
    // scrubbing never waits on the network, and a phone that dropped the
    // video while the page sat in the background needn't fetch it again.
    fetch(VIDEO_SRC)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.blob();
      })
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
        prime();
      })
      .catch(() => {
        if (cancelled) return;
        video.src = VIDEO_SRC;
        prime();
      });

    // Once a second, put the video back where the scroll says it should be:
    // Safari can restore a suspended video at a different time (seen jumping
    // to 18.7 s of 19.3 with the page at the top) without any event.
    const watchdog = window.setInterval(requestSync, 1000);

    video.addEventListener("loadedmetadata", requestSync);
    window.addEventListener("scroll", requestSync, { passive: true });
    document.addEventListener("visibilitychange", onReturn);
    window.addEventListener("pageshow", onReturn);
    window.addEventListener("focus", onReturn);
    // iPhones in Low Power Mode won't start a video until the visitor taps;
    // the first tap unlocks scrubbing.
    window.addEventListener("click", prime, { once: true });
    window.addEventListener("touchend", prime, { once: true, passive: true });
    return () => {
      cancelled = true;
      window.clearInterval(watchdog);
      video.removeEventListener("loadedmetadata", requestSync);
      window.removeEventListener("scroll", requestSync);
      document.removeEventListener("visibilitychange", onReturn);
      window.removeEventListener("pageshow", onReturn);
      window.removeEventListener("focus", onReturn);
      window.removeEventListener("click", prime);
      window.removeEventListener("touchend", prime);
      cancelAnimationFrame(frame);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  return (
    <div ref={sectionRef} style={{ height: "200vh" }}>

      {/* Sticky full-screen hero */}
      <div className="sticky top-0 overflow-hidden" style={{ height: "100vh" }}>

        {/* VIDEO — full background */}
        <video
          ref={videoRef}
          poster="/cover-poster.webp"
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
                Hydraulic bi-fold covers custom made for your swim spa.<br />
                5 year warranty, 6 week turnaround,<br />
                personally managed from start to finish.
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
                  { value: "5 year", label: "WARRANTY" },
                  { value: "6 weeks", label: "TURNAROUND" },
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
