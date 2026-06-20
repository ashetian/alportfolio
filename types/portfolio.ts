export interface HeroData {
  name: string;
  title: string;
  location: string;
  bio: string;
  availability: string;
}

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  role: string[];
  year: string;
  logline: string;
  thumbnail_url: string;
  video_link: string;
  tech_stack: string[];
}

export interface ReelData {
  id: string;
  title: string;
  url: string;
}

export interface ExperienceData {
  role: string;
  project_or_company: string;
  duration: string;
}

export interface InspirationData {
  title: string;
  director: string;
  genre: string;
  why_i_love_it: string;
  image_url?: string;
}

export interface GalleryData {
  id: string;
  image_url: string;
  caption?: string;
}

export interface QAData {
  question: string;
  answer: string;
}

export interface ContactData {
  email: string;
  socials: {
    instagram: string;
    linkedin: string;
  };
}

export interface PortfolioData {
  hero: HeroData;
  filmography: ProjectData[];
  reels: ReelData[];
  experience: ExperienceData[];
  cinema_inspirations: InspirationData[];
  gallery: GalleryData[];
  qa_interview: QAData[];
  contact: ContactData;
}
