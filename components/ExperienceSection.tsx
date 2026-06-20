"use client";

import React, { useEffect, useRef } from "react";
import { ExperienceData } from "../types/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExperienceSectionProps {
  experience: ExperienceData[];
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
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

      // Timeline Items Animations
      containerRefs.current.forEach((item) => {
        if (!item) return;
        
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative py-32 border-b border-black/10">
      <div className="w-full">
        {/* Minimal Section Header */}
        <div className="section-header mb-32 flex flex-col items-center text-center">
          <span className="font-mono text-[10px] text-black/50 font-extrabold tracking-[0.3em] uppercase mb-4 block">
            Set & Kurgu Macerası
          </span>
          <h2 className="font-condensed text-7xl md:text-8xl font-bold tracking-tighter text-black uppercase">
            Deneyim
          </h2>
        </div>

        {/* Minimal Timeline */}
        <div className="flex flex-col gap-0 max-w-5xl mx-auto border-t border-black/10">
          {experience.map((exp, idx) => (
            <div
              key={idx}
              ref={(el) => {
                containerRefs.current[idx] = el;
              }}
              className="group flex flex-col md:flex-row gap-8 md:gap-24 py-12 border-b border-black/10 hover:bg-black/5 transition-colors px-4 md:px-8"
            >
              {/* Year / Duration */}
              <div className="w-fit md:w-1/4 font-mono text-[10px] text-black/50 font-bold tracking-[0.2em] uppercase mt-2">
                {exp.duration}
              </div>

              {/* Role and Company */}
              <div className="flex-1 md:w-3/4">
                <h3 className="font-condensed text-4xl md:text-5xl font-extrabold text-black uppercase tracking-tight mb-2 leading-none group-hover:pl-4 transition-all duration-300">
                  {exp.role}
                </h3>
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest font-mono group-hover:pl-4 transition-all duration-300 delay-75">
                  {exp.project_or_company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
