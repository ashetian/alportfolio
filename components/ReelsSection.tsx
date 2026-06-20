"use client";

import React, { useEffect, useRef } from "react";
import { ReelData } from "../types/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ReelsSectionProps {
  reels: ReelData[];
}

// Helper to explicitly construct the YouTube thumbnail URL.
const getThumbnailUrl = (url: string) => {
  try {
    let id = "";
    if (url.includes("youtube.com/shorts/")) {
      id = url.split("youtube.com/shorts/")[1].split("?")[0];
    } else if (url.includes("youtube.com/watch?v=")) {
      id = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      id = url.split("youtu.be/")[1].split("?")[0];
    }

    if (id) {
      // hqdefault always exists. maxresdefault sometimes doesn't exist for shorts.
      return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    }
  } catch (err) {
    return "";
  }
  return "";
};

export default function ReelsSection({ reels }: ReelsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".reels-header", {
        opacity: 0,
        x: -50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".reels-header",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Horizontal Scroll Items Reveal Animation
      containerRefs.current.forEach((item, idx) => {
        if (!item) return;

        gsap.fromTo(
          item,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: idx * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="reels" className="relative py-24 border-b-2 border-black overflow-hidden">
      <div className="w-full">
        {/* Minimal Section Header */}
        <div className="reels-header mb-16 px-6 md:px-12 lg:px-20 text-left">
          <span className="font-mono text-[10px] text-black/50 font-extrabold tracking-[0.3em] uppercase mb-4 block">
            Dikey Format / Sosyal Medya
          </span>
          <h2 className="font-condensed text-6xl md:text-8xl font-bold tracking-tighter text-black uppercase leading-none">
            REELS & SHORTS
          </h2>
        </div>

        {/* Horizontal Scroll Container (Single Row) */}
        <div className="flex flex-row overflow-x-auto gap-8 pb-12 pt-4 px-6 md:px-12 lg:px-20 max-w-full snap-x snap-mandatory">
          {reels.map((reel, idx) => (
            <a
              key={reel.id}
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => {
                containerRefs.current[idx] = el;
              }}
              className="block group relative flex flex-col items-center w-[300px] sm:w-[340px] shrink-0 snap-center aspect-[9/16] bg-black border-2 border-black brutal-shadow-lg transition-transform hover:-translate-y-2 duration-300"
            >
              {/* Manual Thumbnail Render */}
              <img
                src={getThumbnailUrl(reel.url) || "/hiddenfooter.jpg"}
                alt={reel.title}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              
              {/* Title Overlay for context */}
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
                <span className="font-mono text-[10px] text-[#efffc8] font-bold uppercase tracking-[0.2em] block mb-2">
                  0{idx + 1}
                </span>
                <h3 className="font-condensed text-2xl font-extrabold text-white uppercase tracking-tight leading-[1.1] drop-shadow-md">
                  {reel.title}
                </h3>
              </div>
            </a>
          ))}
          
          {/* Spacer at the end for scroll padding */}
          <div className="shrink-0 w-[4vw]" />
        </div>
      </div>
    </section>
  );
}
