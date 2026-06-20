"use client";

import React, { useRef, useEffect, useState } from "react";
import { GalleryData } from "../types/portfolio";

interface GallerySectionProps {
  gallery: GalleryData[];
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { offsetTop, scrollHeight } = containerRef.current;
      const windowHeight = window.innerHeight;
      
      const scrollY = window.scrollY;
      const scrollableDistance = scrollHeight - windowHeight;
      const scrolled = scrollY - offsetTop;
      
      let progress = scrolled / scrollableDistance;
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        window.scrollBy({ top: e.deltaX, behavior: "auto" });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const scrollWindow = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const { offsetTop, scrollHeight } = containerRef.current;
    const scrollable = scrollHeight - window.innerHeight;
    const step = window.innerWidth * 0.6; // Scroll by roughly one image width

    const currentScrolled = window.scrollY - offsetTop;
    const newScrolled = direction === "left"
      ? Math.max(0, currentScrolled - step)
      : Math.min(scrollable, currentScrolled + step);

    window.scrollTo({
      top: offsetTop + newScrolled,
      behavior: "smooth"
    });
  };


  return (
    <div ref={containerRef} className="relative h-[400vh] bg-background">
      <section id="gallery" className="sticky top-0 h-[100vh] w-[100vw] flex flex-col justify-center overflow-hidden border-t-4 border-black">

        {/* Background Brutalist Marquee */}
        <div className="absolute top-10 left-0 w-full overflow-hidden whitespace-nowrap opacity-[0.03] pointer-events-none select-none flex">
          <div className="animate-marquee inline-block font-condensed text-[15rem] leading-none font-black text-black uppercase tracking-tighter">
            FOTOĞRAF PORTFOLYOSU &nbsp; — &nbsp; FOTOĞRAF PORTFOLYOSU &nbsp; — &nbsp;
          </div>
          <div className="animate-marquee inline-block font-condensed text-[15rem] leading-none font-black text-black uppercase tracking-tighter">
            FOTOĞRAF PORTFOLYOSU &nbsp; — &nbsp; FOTOĞRAF PORTFOLYOSU &nbsp; — &nbsp;
          </div>
        </div>

        <div className="relative z-10 mt-8 flex flex-col md:flex-row md:items-end justify-between mb-8 px-6 md:px-12 lg:px-20 gap-4 md:gap-8">
          <h2 className="font-condensed text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter text-black leading-[0.8] mix-blend-multiply pointer-events-none">
            FOTOĞRAF
          </h2>

          {/* Navigation Controls */}
          <div className="hidden md:flex gap-6 mr-10">
            <button
              onClick={() => scrollWindow("left")}
              className="w-16 h-16 flex items-center justify-center bg-black hover:bg-white text-[#f5c564] hover:text-black border-2 border-black text-4xl font-black transition-colors brutal-shadow-sm brutal-btn-hover"
              aria-label="Previous image"
            >
              &larr;
            </button>
            <button
              onClick={() => scrollWindow("right")}
              className="w-16 h-16 flex items-center justify-center bg-black hover:bg-white text-[#f5c564] hover:text-black border-2 border-black text-4xl font-black transition-colors brutal-shadow-sm brutal-btn-hover"
              aria-label="Next image"
            >
              &rarr;
            </button>
          </div>
        </div>

        {/* Carousel Container - Moving Horizontally via Transform */}
        <div className="relative z-10 w-full overflow-hidden flex items-center">
          <div
            className="flex w-max gap-16 md:gap-32 lg:gap-40 px-12 md:px-32 lg:px-[30vw] will-change-transform ease-out items-center py-8"
            style={{
              transform: `translateX(calc(-${scrollProgress * 100}% + ${scrollProgress * 100}vw))`
            }}
          >
            {gallery.map((item, index) => (
              <div
                key={item.id}
                className="shrink-0 flex flex-col group relative"
              >
                {/* Brutalist Image Wrapper: Height constrained to screen, Portrait Aspect Ratio, Thick Black Border */}
                <div className="relative h-[55vh] md:h-[65vh] lg:h-[70vh] aspect-[3/4] bg-white overflow-hidden border-4 md:border-8 border-black transition-transform duration-300 group-hover:-translate-y-2 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] cursor-crosshair">
                  <img
                    src={item.image_url}
                    alt={item.caption || `Gallery image ${index + 1}`}
                    className="w-full h-full object-cover filter grayscale contrast-125 opacity-80 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100 transition-all duration-300 ease-out scale-100 group-hover:scale-105 pointer-events-none"
                    loading="lazy"
                  />

                  {/* Image Number Overlay */}
                  <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 font-mono text-xl md:text-3xl font-black pointer-events-none">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>

                {item.caption && (
                  <div className="mt-6 flex items-start justify-between border-b-4 border-black/20 pb-2 group-hover:border-black transition-colors pointer-events-none">
                    <span className="font-condensed text-2xl md:text-4xl font-bold uppercase tracking-widest text-black/60 group-hover:text-black transition-colors">
                      {item.caption}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden justify-center gap-6 mt-4 relative z-10">
          <button
            onClick={() => scrollWindow("left")}
            className="w-14 h-14 flex items-center justify-center bg-black active:bg-white text-[#f5c564] active:text-black border-2 border-black text-3xl font-black transition-colors brutal-shadow-sm brutal-btn-hover"
          >
            &larr;
          </button>
          <button
            onClick={() => scrollWindow("right")}
            className="w-14 h-14 flex items-center justify-center bg-black active:bg-white text-[#f5c564] active:text-black border-2 border-black text-3xl font-black transition-colors brutal-shadow-sm brutal-btn-hover"
          >
            &rarr;
          </button>
        </div>

      </section>
    </div>
  );
}
