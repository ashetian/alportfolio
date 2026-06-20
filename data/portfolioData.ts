import { PortfolioData } from "../types/portfolio";

export const portfolioData: PortfolioData = {
  hero: {
    name: "Alparslan B. Coşkun",
    title: "RTS Öğrencisi",
    location: "İzmir-Trabzon, TR",
    bio: "Görüntü yönetmenliği odaklı RTS öğrencisiyim. Belgesel, kısa film ve sokak röportajı deneyimim var. Sette kamera asistanlığından prodüksiyon asistanlığına, ışıktan kurguya her pozisyonda çalışmaya hazırım.",
    availability: "Yeni projelere ve setlere açık"
  },
  filmography: [
    {
      id: "project-1",
      title: "Mühendislikten Avrasya Pazarına",
      category: "Belgesel",
      role: ["Ses", "Kurgucu"],
      year: "2026",
      logline: "Mühendislik mesleğini bırakıp ticareti ve esnaflığı tercih eden Recep Abi’nin hikâyesine konuk olduk. Kendisi, Nur Bilgisayar’ın sahibi ve pazarın kuruluşundan bu yana burada emek veren, yıllardır esnaflık yapan bir isim.",
      thumbnail_url: "/projects/avrasyapazari.jpg",
      video_link: "https://youtu.be/tTubHNmUobA",
      tech_stack: ["FujiFilm X-T5", "Rode NT-USB", "Adobe Premiere", "Adobe After Effects"]
    }
  ],
  reels: [
    {
      id: "reel-1",
      title: "Trabzon'un 45 Yıllık Yol Sorunununa Çözüm Üretti",
      url: "https://youtube.com/shorts/z0a8sVZ52sc?si=cfbDO7x_ViAsNFIs"
    },
    {
      id: "reel-2",
      title: "Rizeli Taraftarın Trabzonspor Sözleri Gündem Oldu",
      url: "https://youtube.com/shorts/oRDFjzOGHsI?si=kJTsQe6Xe8-cy4Jo"
    },
    {
      id: "reel-3",
      title: "Trabzonspor-Beşiktaş Derbisi Sizce Kaç Kaç Biter?",
      url: "https://youtube.com/shorts/u2zv5ozNV94?si=08jXznL6OEkR_M0k"
    },
    {
      id: "reel-4",
      title: "Trabzon Trafiği Demeye Kalmadan Olanlar Oldu",
      url: "https://youtube.com/shorts/nQd90fNGe54?si=OzidtnDS0k_-6a8x"
    },
  ],
  experience: [
    {
      role: "Işık Asistanı",
      project_or_company: "Bir Zamanlar Bağımsız (Uzun Metraj)",
      duration: "2023 - 2024"
    },
    {
      role: "Kurgucu",
      project_or_company: "Üniversite Sinema Kulübü",
      duration: "2022 - Devam Ediyor"
    }
  ],
  cinema_inspirations: [
    {
      title: "400 Blows",
      director: "François Truffaut",
      genre: "Drama",
      image_url: "https://upload.wikimedia.org/wikipedia/en/f/f9/Quatre_coups2.jpg",
      why_i_love_it: "Gençlik sinemasının en ikonik filmlerinden biri.Antoine Doinel'in gözünden Paris sokaklarında geçen bu hikaye, özgürlük arayışının ve isyanın en saf halini anlatıyor."
    },
    {
      title: "Pulp Fiction",
      director: "Quentin Tarantino",
      genre: "Crime/Drama/Action",
      image_url: "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_(1994)_poster.jpg",
      why_i_love_it: "Kurgu masasındaki dehasını gözler önüne serdiği bu filmde, senaryo yapısı ve karakter derinliği, yönetmenlik tercihlerinin gücünü kanıtlar nitelikte."
    }
  ],
  gallery: [
    {
      id: "gallery-1",
      image_url: "/pics/IMG_0859.JPG",
      caption: "FOTOĞRAF - 01"
    },
    {
      id: "gallery-2",
      image_url: "/pics/IMG_1038.JPG",
      caption: "FOTOĞRAF - 02"
    },
    {
      id: "gallery-3",
      image_url: "/pics/IMG_1100.JPG",
      caption: "FOTOĞRAF - 03"
    },
    {
      id: "gallery-4",
      image_url: "/pics/IMG_1643.JPG",
      caption: "FOTOĞRAF - 04"
    },
    {
      id: "gallery-5",
      image_url: "/pics/IMG_1662.JPG",
      caption: "FOTOĞRAF - 05"
    },
    {
      id: "gallery-6",
      image_url: "/pics/IMG_1780.JPG",
      caption: "FOTOĞRAF - 06"
    }
  ],
  qa_interview: [
    {
      question: "Sence iyi bir sinemacıyı ne ayırır?",
      answer: "Teknik ekipmanların ötesinde, iyi bir sinemacı izleyicinin ne hissedeceğini öngörebilen kişidir. Işık, ses veya lens seçimi sadece bu hissi aktarmak için birer araçtır."
    },
    {
      question: "Setlerde en çok neyi seversin?",
      answer: "Kaosun içindeki o senkronizasyonu. Motor dendiği an herkesin tek bir vizyon için nefesini tutması eşsiz bir duygu."
    },
    {
      question: "Gece seni ne uyutmaz?",
      answer: "Kurguda tam oturmayan o tek karelik kesme veya yazmaya çalıştığım karakterin tıkandığı diyaloglar."
    }
  ],
  contact: {
    email: "alparslanbugracoskun@gmail.com",
    socials: {
      instagram: "https://instagram.com/obramecaialp",
      linkedin: "https://linkedin.com/in/alparslan-çoşkun"
    }
  }
};
