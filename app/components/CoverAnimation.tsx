"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const PANEL_COUNT = 6;

export default function CoverAnimation() {
  const controls = useAnimation();

  useEffect(() => {
    let cancelled = false;
    async function loop() {
      while (!cancelled) {
        await new Promise((r) => setTimeout(r, 1200));
        // Open: panels accordion-fold toward the back, revealing water
        await controls.start("open");
        await new Promise((r) => setTimeout(r, 3000));
        // Close: panels unfold back over the spa
        await controls.start("closed");
        await new Promise((r) => setTimeout(r, 2000));
      }
    }
    loop();
    return () => { cancelled = true; };
  }, [controls]);

  return (
    <div className="flex flex-col items-center gap-4 select-none">
      {/* Outer glow */}
      <div className="relative">
        <div className="absolute inset-0 rounded-3xl blur-3xl opacity-20 bg-cyan-400 transition-opacity duration-1000" />

        {/* Scene container */}
        <div
          style={{
            width: 340,
            height: 260,
            perspective: "600px",
            perspectiveOrigin: "50% 30%",
          }}
        >
          {/* Spa viewed from slight top-down angle */}
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: "rotateX(28deg)",
              transformStyle: "preserve-3d",
              position: "relative",
            }}
          >
            {/* Deck surround */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(145deg, #c8a96e 0%, #a07840 100%)",
                borderRadius: 16,
                boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              }}
            />

            {/* Wood grain lines on surround */}
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: `${(i / 18) * 100}%`,
                  width: 1,
                  background: "rgba(0,0,0,0.08)",
                }}
              />
            ))}

            {/* Spa opening (water area) */}
            <div
              style={{
                position: "absolute",
                top: 20,
                bottom: 20,
                left: 20,
                right: 20,
                background: "linear-gradient(160deg, #0ea5e9 0%, #0369a1 60%, #1e3a8a 100%)",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              {/* Water shimmer */}
              <motion.div
                animate={{ x: ["-130%", "130%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 0.3 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                }}
              />
              {/* Ripple rings */}
              {[0, 0.7, 1.4].map((d) => (
                <motion.div
                  key={d}
                  animate={{ scale: [0.1, 2.2], opacity: [0.6, 0] }}
                  transition={{ duration: 2, delay: d, repeat: Infinity, repeatDelay: 1.2, ease: "easeOut" }}
                  style={{
                    position: "absolute",
                    top: "50%", left: "50%",
                    width: 40, height: 40,
                    marginTop: -20, marginLeft: -20,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,0.4)",
                  }}
                />
              ))}
            </div>

            {/* ── ACCORDION PANELS ── stacked along the length (top to bottom) */}
            {Array.from({ length: PANEL_COUNT }).map((_, i) => {
              const panelHeight = (220 - 40) / PANEL_COUNT; // spa height / panels
              const topOffset = 20 + i * panelHeight;
              // Each panel folds toward the back (top) with increasing delay
              // Odd panels fold forward, even panels fold backward for accordion effect
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  animate={controls}
                  variants={{
                    closed: {
                      y: 0,
                      scaleY: 1,
                      opacity: 1,
                      rotateX: 0,
                    },
                    open: {
                      y: -(i * panelHeight * 0.92),
                      scaleY: isEven ? 1 : 0.08,
                      opacity: i === PANEL_COUNT - 1 ? 1 : isEven ? 1 : 0,
                      rotateX: isEven ? 0 : -90,
                    },
                  }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.12,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{
                    position: "absolute",
                    top: topOffset,
                    left: 20,
                    right: 20,
                    height: panelHeight,
                    transformOrigin: "center top",
                    transformStyle: "preserve-3d",
                    zIndex: PANEL_COUNT - i,
                  }}
                >
                  {/* Panel surface — composite wood look */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(180deg,
                        ${i % 2 === 0 ? "#c8a96e" : "#b8965e"} 0%,
                        ${i % 2 === 0 ? "#b8965e" : "#a07840"} 100%)`,
                      borderTop: i === 0 ? "none" : "1.5px solid rgba(0,0,0,0.25)",
                      overflow: "hidden",
                    }}
                  >
                    {/* Wood slat lines */}
                    {Array.from({ length: 12 }).map((_, j) => (
                      <div
                        key={j}
                        style={{
                          position: "absolute",
                          top: 0,
                          bottom: 0,
                          left: `${(j / 12) * 100}%`,
                          width: 1,
                          background: "rgba(0,0,0,0.1)",
                        }}
                      />
                    ))}
                    {/* Hinge hardware dots */}
                    {i > 0 && [20, 50, 80].map((p) => (
                      <div
                        key={p}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: `${p}%`,
                          width: 6,
                          height: 6,
                          marginLeft: -3,
                          marginTop: -3,
                          borderRadius: "50%",
                          background: "#4a3728",
                          border: "1px solid rgba(0,0,0,0.4)",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* Stacked panel block at back (visible when open) */}
            <motion.div
              animate={controls}
              variants={{
                closed: { scaleY: 0, opacity: 0 },
                open: { scaleY: 1, opacity: 1 },
              }}
              transition={{ duration: 0.4, delay: PANEL_COUNT * 0.12 + 0.2 }}
              style={{
                position: "absolute",
                top: 20,
                left: 20,
                right: 20,
                height: 28,
                transformOrigin: "center top",
                background: "linear-gradient(180deg, #a07840 0%, #7a5a2e 100%)",
                borderRadius: "4px 4px 0 0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                overflow: "hidden",
              }}
            >
              {/* Stack indicator lines */}
              {[1, 2, 3, 4].map((l) => (
                <div
                  key={l}
                  style={{
                    position: "absolute",
                    top: l * 5,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: "rgba(0,0,0,0.2)",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ backgroundColor: ["#fcaf3b", "#22d3ee", "#fcaf3b"] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ width: 8, height: 8, borderRadius: "50%" }}
        />
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 500 }}>
          Bi-Fold Retractable Cover
        </p>
      </div>
    </div>
  );
}
