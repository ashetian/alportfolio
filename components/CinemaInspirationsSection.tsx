"use client";

import React, { useEffect, useRef } from "react";
import { InspirationData } from "../types/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CinemaInspirationsSectionProps {
  inspirations: InspirationData[];
}

export default function CinemaInspirationsSection({
  inspirations,
}: CinemaInspirationsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".section-header", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".section-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Cards Animation
      containerRefs.current.forEach((item) => {
        if (!item) return;

        gsap.fromTo(
          item,
          { opacity: 0, y: 50, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="inspirations" className="relative py-32 border-b border-black/10">
      <div className="w-full">
        {/* Minimal Section Header */}
        <div className="section-header mb-32 flex flex-col items-center text-center">
          <span className="font-mono text-[10px] text-black/50 font-extrabold tracking-[0.3em] uppercase mb-4 block">
            Vizyonumu Şekillendirenler
          </span>
          <h2 className="font-condensed text-7xl md:text-8xl font-bold tracking-tighter text-black uppercase">
            İlhamlar
          </h2>
        </div>

        {/* Minimal Cards Grid (Stack Layout) */}
        <div className="flex flex-col gap-12 max-w-5xl mx-auto px-4 md:px-0">
          {inspirations.map((movie, idx) => (
            <div
              key={idx}
              ref={(el) => {
                containerRefs.current[idx] = el;
              }}
              className="group relative p-8 md:p-12 bg-[#f4f4f4] hover:bg-black hover:text-[#efffc8] transition-colors duration-500 flex flex-col md:flex-row items-center gap-12 border-2 border-transparent hover:border-black brutal-shadow-sm hover:brutal-shadow-lg"
            >
              {/* Poster Image */}
              {movie.image_url && (
                <div className="shrink-0 w-[200px] md:w-[240px] aspect-[2/3] border-2 border-black brutal-shadow-sm overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img
                    src={movie.image_url}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  {/* Director & Genre Header */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] text-black/40 group-hover:text-[#efffc8]/50 font-bold tracking-[0.2em] mb-6 uppercase transition-colors">
                    <span className="text-black group-hover:text-[#efffc8] transition-colors">{movie.director}</span>
                    <span className="w-4 h-[1px] bg-black/20 group-hover:bg-[#efffc8]/20 transition-colors" />
                    <span>{movie.genre}</span>
                  </div>

                  {/* Movie Title */}
                  <h3 className="font-condensed text-5xl md:text-7xl font-extrabold text-black group-hover:text-white uppercase tracking-tight mb-8 leading-[0.9] transition-colors">
                    {movie.title}
                  </h3>

                  {/* Review Text */}
                  <p className="text-zinc-600 group-hover:text-white/80 text-base md:text-lg font-medium leading-relaxed max-w-xl transition-colors">
                    {movie.why_i_love_it}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
