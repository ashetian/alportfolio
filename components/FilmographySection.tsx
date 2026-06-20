"use client";

import React, { useEffect, useRef } from "react";
import { ProjectData } from "../types/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FilmographySectionProps {
  projects: ProjectData[];
}

export default function FilmographySection({ projects }: FilmographySectionProps) {
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

      // Project Item Animations with cinematic reveal
      containerRefs.current.forEach((item) => {
        if (!item) return;

        const img = item.querySelector(".project-img-container");
        const content = item.querySelector(".project-content");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        // Image slide reveal mask
        tl.fromTo(
          img,
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power4.inOut" }
        )
        // Content fade in
        .fromTo(
          content,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="filmography" className="relative py-32 border-b border-black/10">
      <div className="w-full">
        {/* Minimal Section Header */}
        <div className="section-header mb-32 flex flex-col items-center text-center">
          <span className="font-mono text-[10px] text-black/50 font-extrabold tracking-[0.3em] uppercase mb-4 block">
            Seçili İşler
          </span>
          <h2 className="font-condensed text-7xl md:text-8xl font-bold tracking-tighter text-black uppercase">
            Filmografi
          </h2>
        </div>

        {/* Minimal Project List with Alternating Layout */}
        <div className="flex flex-col gap-32 md:gap-48">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              ref={(el) => {
                containerRefs.current[idx] = el;
              }}
              className={`flex flex-col gap-8 md:gap-20 items-center group ${
                idx % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Project Image - 60% width */}
              <div className="project-img-container w-full md:w-3/5 aspect-[16/9] relative overflow-hidden bg-[#e0e0e0]">
                {project.thumbnail_url ? (
                  <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-xs font-bold text-black/20">GÖRSEL YOK</div>
                )}
              </div>

              {/* Minimal Project Details - 40% width */}
              <div className="project-content w-full md:w-2/5 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6 font-mono text-[10px] text-black/50 font-bold uppercase tracking-[0.2em]">
                  <span>{project.year}</span>
                  <span className="w-8 h-[1px] bg-black/20" />
                  <span>{project.category}</span>
                </div>
                
                <h3 className="font-condensed text-5xl md:text-6xl font-extrabold text-black uppercase tracking-tight mb-6 leading-[0.9]">
                  {project.title}
                </h3>
                
                <p className="text-base text-zinc-600 mb-10 leading-relaxed font-medium">
                  {project.logline}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-black/10 pt-6 gap-4">
                  <span className="font-mono text-[10px] text-black/50 font-bold tracking-[0.2em] uppercase">
                    {project.role.join(" · ")}
                  </span>
                  
                  <a
                    href={project.video_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] font-bold text-black uppercase tracking-[0.2em] flex items-center gap-2 hover:opacity-50 transition-opacity"
                  >
                    Projeyi İzle
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
