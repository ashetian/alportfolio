"use client";

import React, { useEffect, useRef } from "react";
import { QAData } from "../types/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface QAInterviewSectionProps {
  qa: QAData[];
  name: string;
}

export default function QAInterviewSection({ qa, name }: QAInterviewSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".section-header", {
        opacity: 0,
        x: -50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".section-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // QA Items Animation
      containerRefs.current.forEach((item) => {
        if (!item) return;
        
        gsap.fromTo(
          item,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
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
    <section ref={sectionRef} id="interview" className="relative py-32 border-b border-black/10">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start max-w-7xl mx-auto">
          {/* Left Column: Headers (4 cols) */}
          <div className="lg:col-span-4 section-header sticky top-32">
            <span className="font-mono text-[10px] text-black/50 font-extrabold tracking-[0.3em] uppercase mb-4 block">
              Düşünce Kareleri
            </span>
            <h2 className="font-condensed text-7xl md:text-8xl font-bold tracking-tighter text-black uppercase leading-[0.9]">
              Kısa<br/>Cevaplar
            </h2>
          </div>

          {/* Right Column: Q&A Dialogues (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-16">
            {qa.map((item, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  containerRefs.current[idx] = el;
                }}
                className="flex flex-col gap-6"
              >
                <div className="font-mono text-[10px] text-black/40 font-bold tracking-[0.2em] uppercase">
                  Q. 0{idx + 1}
                </div>
                <h3 className="font-condensed text-4xl md:text-5xl font-extrabold text-black uppercase leading-[1.1] tracking-tight">
                  {item.question}
                </h3>
                <p className="text-lg text-zinc-600 leading-relaxed font-medium mt-2 max-w-2xl">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
