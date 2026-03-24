"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0f1117]/95 backdrop-blur-md shadow-lg" : "bg-gradient-to-b from-[#0f1117]/80 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-white.png"
            alt="Active Covers Australia"
            width={160}
            height={71}
            priority
            className="h-16 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {["Products", "Gallery", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
          <a
            href="/finance"
            className="text-sm font-medium text-[#fcaf3b] hover:text-white transition-colors"
          >
            Finance
          </a>
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:1300502650"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            1300 50 26 50
          </a>
          <a
            href="#contact"
            className="bg-[#fcaf3b] hover:bg-[#e8961f] text-[#0f1117] text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
          >
            Free Quote
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-white transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0f1117]/98 backdrop-blur-md px-6 py-6 flex flex-col gap-5 border-t border-white/10">
          {["Products", "Gallery", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/80 hover:text-white font-medium text-lg"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="/finance"
            className="text-[#fcaf3b] hover:text-white font-medium text-lg"
            onClick={() => setMenuOpen(false)}
          >
            Finance
          </a>
          <a
            href="tel:1300502650"
            className="text-[#fcaf3b] font-medium text-lg"
          >
            1300 50 26 50
          </a>
          <a
            href="#contact"
            className="bg-[#fcaf3b] text-[#0f1117] font-bold px-5 py-3 rounded-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Free Quote
          </a>
        </div>
      )}
    </header>
  );
}
