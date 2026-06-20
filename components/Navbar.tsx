"use client";

import React, { useState, useEffect } from "react";

interface NavbarProps {
  name: string;
}

export default function Navbar({ name }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="w-full px-6 flex items-center justify-between">
        {/* Brand / Name & REC Tag */}
        <div className="flex items-center gap-4">
          <a href="#" className="font-condensed text-3xl font-bold tracking-wider hover:opacity-80 transition-opacity text-black">
            {name.toUpperCase()}
          </a>
          <span className="flex items-center gap-1.5 px-2 py-0.5 bg-black text-[9px] font-mono font-bold uppercase tracking-widest text-background">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-red animate-flash-red"></span>
            REC
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs font-bold tracking-widest text-black">
          <a href="#filmography" className="relative group py-1">
            FİLMOGRAFİ
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
          </a>
          <a href="#experience" className="relative group py-1">
            DENEYİM
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
          </a>
          <a href="#inspirations" className="relative group py-1">
            İLHAMLAR
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
          </a>
          <a href="#interview" className="relative group py-1">
            RÖPORTAJ
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
          </a>
          <a href="#contact" className="relative group py-1">
            İLETİŞİM
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
          </a>
        </div>

        {/* Mobile Contact Link */}
        <div className="md:hidden">
          <a
            href="#contact"
            className="font-mono text-xs text-background bg-black hover:bg-zinc-900 px-3 py-1.5 font-bold transition-all"
          >
            İLETİŞİM
          </a>
        </div>
      </div>
    </nav>
  );
}
