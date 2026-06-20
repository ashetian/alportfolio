"use client";

import React, { useState } from "react";
import { ContactData } from "../types/portfolio";

interface ContactSectionProps {
  contact: ContactData;
}

export default function ContactSection({ contact }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative w-full h-full flex flex-col justify-end bg-black/60 overflow-hidden pt-20">
      {/* Background Image (Brutalist stark treatment) */}
      <img
        src="/hiddenfooter.jpg"
        alt="Contact Background"
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 flex-1 flex flex-col justify-end pb-12 md:pb-24">
        {/* Massive Brutalist Header */}
        <h2 className="font-condensed text-[6rem] sm:text-[9rem] md:text-[14rem] lg:text-[20rem] font-extrabold tracking-tighter text-white/50 uppercase mb-4 md:mb-8 leading-[0.75] mix-blend-difference select-none">
          İLETİŞİM
        </h2>

        {/* Action Grid (Brutalist, Sharp, Exposed Borders) */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t-2 border-b-2 border-white/40 divide-y-2 md:divide-y-0 md:divide-x-2 divide-white/40 backdrop-blur-sm bg-black/10">

          <div className="p-8 md:p-12 flex flex-col justify-between min-h-[160px]">
            <span className="font-mono text-xs font-bold text-[#efffc8] uppercase tracking-widest mb-8">
              Yeni Bir Proje Mi?
            </span>
            <p className="text-white text-xl md:text-2xl font-bold uppercase leading-tight break-words tracking-wide">
              {contact.email}
            </p>
          </div>

          <a
            href={`mailto:${contact.email}`}
            className="p-8 md:p-12 flex flex-col justify-between group hover:bg-[#efffc8] transition-colors min-h-[160px]"
          >
            <span className="font-mono text-xs font-bold text-white/50 group-hover:text-black/60 uppercase tracking-widest mb-8 flex items-center gap-2">
              E-Posta Yaz
            </span>
            <div className="flex justify-between items-center text-white group-hover:text-black">
              <span className="text-2xl md:text-4xl font-extrabold uppercase font-condensed tracking-tight flex items-center gap-4">
                <img src="/logos/Email-Envelope-Close--Streamline-Pixel.svg" alt="Email" className="w-8 h-8 md:w-10 md:h-10 invert group-hover:invert-0 transition-all" />
                Mail Gönder
              </span>
              <span className="text-4xl leading-none">↗</span>
            </div>
          </a>

          <button
            onClick={handleCopyEmail}
            className="p-8 md:p-12 flex flex-col justify-between group hover:bg-white text-left transition-colors min-h-[160px]"
          >
            <span className="font-mono text-xs font-bold text-white/50 group-hover:text-black/60 uppercase tracking-widest mb-8">
              {copied ? "[ KOPYALANDI ]" : "ADRESİ KOPYALA"}
            </span>
            <div className="flex justify-between items-center text-white group-hover:text-black">
              <span className="text-2xl md:text-4xl font-extrabold uppercase font-condensed tracking-tight">Panoya Al</span>
              <span className="text-4xl leading-none">⧉</span>
            </div>
          </button>
        </div>

        {/* Brutalist Social Links Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-6 border-t-2 border-white/10 pt-8">
          <div className="flex flex-wrap gap-8 md:gap-12">
            {Object.entries(contact.socials).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-condensed text-3xl md:text-5xl font-bold text-white hover:text-[#efffc8] uppercase tracking-wider transition-colors leading-none flex items-center gap-3 group"
              >
                {platform === "instagram" && (
                  <img src="/logos/Logo-Social-Media-Old-Instagram--Streamline-Pixel.svg" alt="Instagram" className="w-8 h-8 md:w-12 md:h-12 invert transition-all" />
                )}
                {platform === "linkedin" && (
                  <img src="/logos/Logo-Linkedin--Streamline-Pixel.svg" alt="LinkedIn" className="w-8 h-8 md:w-12 md:h-12 invert transition-all" />
                )}
                {platform}
              </a>
            ))}
          </div>
          <p className="font-mono text-[10px] md:text-xs text-white/40 font-bold tracking-[0.2em] uppercase text-center md:text-right">
            © {new Date().getFullYear()} — Made by Caner Görez with ❤️<br className="hidden md:block" /> TÜM HAKLARI SAKLIDIR.
          </p>
        </div>
      </div>
    </section>
  );
}
