"use client";

import React, { useEffect, useRef, useState } from "react";
import { HeroData } from "../types/portfolio";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BubbleMenu from "./BubbleMenu";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSectionProps {
  data: HeroData;
  email: string;
}

const items = [
  {
    label: 'FİLMOGRAFİ',
    href: '#filmography',
    ariaLabel: 'Filmography',
    rotation: -8,
    hoverStyles: { bgColor: '#2d3142', textColor: '#efffc8' }
  },
  {
    label: 'REELS',
    href: '#reels',
    ariaLabel: 'Reels',
    rotation: 6,
    hoverStyles: { bgColor: '#2d3142', textColor: '#efffc8' }
  },
  {
    label: 'DENEYİM',
    href: '#experience',
    ariaLabel: 'Experience',
    rotation: -4,
    hoverStyles: { bgColor: '#2d3142', textColor: '#efffc8' }
  },
  {
    label: 'FOTOĞRAF',
    href: '#gallery',
    ariaLabel: 'Gallery',
    rotation: 4,
    hoverStyles: { bgColor: '#2d3142', textColor: '#efffc8' }
  },
  {
    label: 'RÖPORTAJ',
    href: '#interview',
    ariaLabel: 'Interview',
    rotation: -6,
    hoverStyles: { bgColor: '#2d3142', textColor: '#efffc8' }
  },
  {
    label: 'İLETİŞİM',
    href: '#contact',
    ariaLabel: 'Contact',
    rotation: 8,
    hoverStyles: { bgColor: '#2d3142', textColor: '#efffc8' }
  }
];


export default function HeroSection({ data, email }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const portraitImgRef = useRef<HTMLImageElement>(null);

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  // Live Running Clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      const formattedHours = (now.getHours() % 12 || 12).toString().padStart(2, "0");
      setCurrentTime(`${formattedHours}:${minutes} ${ampm}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format Date (e.g. "JUN 19, 2026")
  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
    setCurrentDate(now.toLocaleDateString("en-US", options).toUpperCase());
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup panels entrance
      gsap.from(leftPanelRef.current, {
        opacity: 0,
        x: -40,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(rightPanelRef.current, {
        opacity: 0,
        x: 40,
        duration: 1.2,
        ease: "power4.out",
      });

      // Parallax scroll on portrait SVG inside right panel
      if (portraitImgRef.current && rightPanelRef.current) {
        gsap.fromTo(
          portraitImgRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: rightPanelRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const nameParts = data.name.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen grid grid-cols-1 md:grid-cols-2 select-none border-b-2 border-black overflow-hidden bg-background"
    >
      {/* Absolute Top Navigation inside Hero */}
      <BubbleMenu
        logo={<div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-[#efffc8] shadow-md">
          <span className="font-condensed text-3xl tracking-tighter" style={{ fontWeight: 900 }}>ALP</span>
        </div>}
        items={items}
        menuAriaLabel="Toggle navigation"
        menuBg="#2d3142"
        menuContentColor="#efffc8"
        useFixedPosition={false}
        className="pt-4 md:pt-8"
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.12}
      />

      {/* LEFT PANEL: Solid Yellow Background, Asymmetrical Name, Bio & Footer */}
      <div
        ref={leftPanelRef}
        className="bg-[#efffc8] px-8 pt-32 pb-8 md:px-12 md:pt-40 md:pb-12 flex flex-col justify-between items-start border-r-2 border-black h-full min-h-[500px] md:min-h-0"
      >
        {/* Center: Giant Typography & Bio */}
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 my-auto">
          {/* Stacked Name Header */}
          <div className="flex flex-col">
            <h1 className="font-condensed text-[5.5rem] sm:text-[6.5rem] md:text-[7rem] lg:text-[8rem] leading-[0.75] font-extrabold text-black tracking-tighter uppercase">
              {nameParts[0]}
            </h1>
            <h1 className="font-condensed text-[5.5rem] sm:text-[6.5rem] md:text-[7rem] lg:text-[8rem] leading-[0.75] font-extrabold text-black tracking-tighter uppercase ml-4 sm:ml-8">
              {nameParts.slice(1).join(" ")}
            </h1>
          </div>

          {/* Inline Bio description (Muted, Minimal) */}
          <div className="max-w-[200px] font-sans text-xs font-bold leading-relaxed text-black/80 lg:mt-6">
            <p>{data.bio}</p>
          </div>
        </div>

        {/* Bottom Footer Metadata */}
        <div className="w-full flex justify-between items-center font-mono text-[9px] font-bold text-black uppercase tracking-wider pt-6 border-t border-black/10">
          <span>{data.location}</span>
          <span>{currentDate}</span>
          <span>{currentTime}</span>
        </div>
      </div>

      {/* RIGHT PANEL: Borderless Full-Bleed Portrait Image Placeholder with email button */}
      <div
        ref={rightPanelRef}
        className="relative bg-[#eed28f]/40 overflow-hidden flex items-center justify-center h-full min-h-[500px] md:min-h-0"
      >
        {/* Profile Image (GSAP Parallax animated) */}
        <img
          ref={portraitImgRef}
          src="/profilephoto.jpeg"
          alt="Profile Photo"
          className="w-[110%] h-[110%] absolute object-cover origin-center transition-transform duration-300 ease-out"
        />
      </div>
    </section>
  );
}
