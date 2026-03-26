"use client";
import { useState } from "react";

const emailParts = ["info", "activecovers", "com.au"];

export default function Footer() {
  const year = new Date().getFullYear();
  const [emailRevealed, setEmailRevealed] = useState(false);
  const email = `${emailParts[0]}@${emailParts[1]}.${emailParts[2]}`;

  return (
    <footer style={{ background: "#0a0d14" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="flex items-center gap-1">
              <span className="font-display font-bold text-2xl text-white tracking-tight">ACTIVE</span>
              <span className="font-display font-bold text-2xl text-[#fcaf3b] tracking-tight">COVERS</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              Australia&apos;s leading manufacturer of hydraulic swim spa covers.
              Family owned and operated since 1992, proudly made in Sydney.
            </p>
            <a
              href="tel:1300502650"
              className="inline-flex items-center gap-2 text-[#fcaf3b] font-bold hover:underline"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z" />
              </svg>
              1300 50 26 50
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#fcaf3b] mb-5">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Products", href: "#products" },
                { label: "Gallery", href: "#gallery" },
                { label: "About", href: "#about" },
                { label: "Finance", href: "/finance" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#fcaf3b] mb-5">
              Contact
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <button
                  onClick={() => {
                    if (emailRevealed) window.location.href = `mailto:${email}`;
                    else setEmailRevealed(true);
                  }}
                  className="text-sm transition-colors hover:text-white cursor-pointer text-left"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {emailRevealed ? email : "info@active•••••••"}
                </button>
              </li>
              <li>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  20 Bond Street, Sydney NSW 2000
                </span>
              </li>
              <li>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Mon – Fri, Business Hours
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © {year} Active Covers Australia. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.3)" }}>
              Privacy Policy
            </a>
            <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.3)" }}>
              Warranty
            </a>
            <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.3)" }}>
              Operating Guide
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
