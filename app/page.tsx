import React from "react";
import { portfolioData } from "../data/portfolioData";
import HeroSection from "../components/HeroSection";
import FilmographySection from "../components/FilmographySection";
import ReelsSection from "../components/ReelsSection";
import ExperienceSection from "../components/ExperienceSection";
import CinemaInspirationsSection from "../components/CinemaInspirationsSection";
import GallerySection from "../components/GallerySection";
import QAInterviewSection from "../components/QAInterviewSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <div className="w-full min-h-screen relative">
      {/* Global Fixed Mail Button */}
      <a
        href={`mailto:${portfolioData.contact.email}`}
        className="fixed bottom-8 right-8 z-[999] w-14 h-14 rounded-full bg-black hover:bg-[#efffc8] text-[#efffc8] flex items-center justify-center transition-all shadow-[0_4px_15px_rgba(0,0,0,0.3)] hover:scale-105 group"
        title="E-posta Gönder"
      >
        <img src="/logos/Email-Envelope-Close--Streamline-Pixel.svg" alt="Email" className="w-6 h-6 invert group-hover:invert-0 transition-all" />
      </a>

      {/* Hidden Contact Footer (Bottom Fixed Layer) */}
      <div className="fixed bottom-0 left-0 w-full h-screen z-0">
        <ContactSection contact={portfolioData.contact} />
      </div>

      {/* Main Page Layout (Full-Bleed, Borderless, Wide Space Utilization) */}
      <main className="w-full relative z-10 bg-background mb-[100vh] shadow-[0_20px_50px_rgba(0,0,0,0.8)] pb-12">
        {/* Intro Hero Section (Full Screen) */}
        <HeroSection data={portfolioData.hero} email={portfolioData.contact.email} />

        <div className="w-full px-6 md:px-12 lg:px-20">
          {/* Selected Film Projects */}
          <FilmographySection projects={portfolioData.filmography} />

          {/* Reels / Short Form */}
          <ReelsSection reels={portfolioData.reels} />

          {/* Set & Editor Experience Timeline */}
          <ExperienceSection experience={portfolioData.experience} />

          {/* Cinematic Inspirations Cards */}
          <CinemaInspirationsSection inspirations={portfolioData.cinema_inspirations} />

          {/* Set / BTS Gallery Carousel */}
          <GallerySection gallery={portfolioData.gallery} />

          {/* Script-formatted Q&A Interview */}
          <QAInterviewSection qa={portfolioData.qa_interview} name={portfolioData.hero.name} />
        </div>
      </main>
    </div>
  );
}
