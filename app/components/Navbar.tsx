"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = ["Products", "Gallery", "About", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  // On the home page, the current link is the section crossing the middle
  // of the screen; at the hero or the stats bar no section link is lit.
  const [inView, setInView] = useState<string | null>(null);
  useEffect(() => {
    if (!onHome) return;
    const ids = SECTIONS.map((s) => s.toLowerCase());
    const visible: Record<string, boolean> = {};
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { visible[e.target.id] = e.isIntersecting; });
        setInView(ids.find((id) => visible[id]) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);
  const currentSection = onHome ? inView : null;
  const financeCurrent = pathname === "/finance";

  const linkColour = (current: boolean) =>
    current ? "text-[#fcaf3b]" : "text-white/80 hover:text-white";

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
          {SECTIONS.map((item) => (
            <Link
              key={item}
              href={`/#${item.toLowerCase()}`}
              aria-current={currentSection === item.toLowerCase() ? "location" : undefined}
              className={`text-sm font-medium transition-colors ${linkColour(currentSection === item.toLowerCase())}`}
            >
              {item}
            </Link>
          ))}
          <a
            href="/finance"
            aria-current={financeCurrent ? "page" : undefined}
            className={`text-sm font-medium transition-colors ${linkColour(financeCurrent)}`}
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
          <Link
            href="/#contact"
            className="bg-[#fcaf3b] hover:bg-[#e8961f] text-[#0f1117] text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
          >
            Free Quote
          </Link>
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
      <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden bg-[#0f1117]/98 backdrop-blur-md px-6 py-6 flex flex-col gap-5 border-t border-white/10 overflow-hidden"
        >
          {SECTIONS.map((item) => (
            <Link
              key={item}
              href={`/#${item.toLowerCase()}`}
              aria-current={currentSection === item.toLowerCase() ? "location" : undefined}
              className={`font-medium text-lg ${linkColour(currentSection === item.toLowerCase())}`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <a
            href="/finance"
            aria-current={financeCurrent ? "page" : undefined}
            className={`font-medium text-lg ${linkColour(financeCurrent)}`}
            onClick={() => setMenuOpen(false)}
          >
            Finance
          </a>
          <a
            href="tel:1300502650"
            className="text-white/80 hover:text-white font-medium text-lg"
          >
            1300 50 26 50
          </a>
          <Link
            href="/#contact"
            className="bg-[#fcaf3b] text-[#0f1117] font-bold px-5 py-3 rounded-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Free Quote
          </Link>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
}
