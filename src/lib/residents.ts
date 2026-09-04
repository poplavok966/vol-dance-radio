export type SocialKind =
  | "telegram"
  | "youtube"
  | "instagram"
  | "soundcloud"
  | "spotify"
  | "facebook"
  | "tiktok"
  | "threads";

export type ResidentLink = {
  type: SocialKind;
  label: string;
  href: string;
};

export type Resident = {
  id: string;
  name: string;
  realName: string;
  role: string;
  photo: string;
  objectPos: string;
  bio: string;
  genres: string[];
  links: ResidentLink[];
  featured?: boolean;
};

export const RESIDENTS: Resident[] = [
  {
    id: "alexx",
    name: "Dj Alexx",
    realName: "Олександр Ганюк",
    role: "Хедлайнер · Event & Club DJ",
    photo: "/residents/alex.jpg",
    objectPos: "object-center",
    bio: "Хедлайнер VOL DANCE RADIO — Event & Club DJ із 16-річним досвідом. Офіційний резидент станції.",
    genres: ["Event", "Club", "16 років досвіду"],
    links: [
      { type: "instagram", label: "Instagram", href: "https://www.instagram.com/alexx_dj_/" },
      { type: "telegram", label: "Telegram", href: "https://t.me/alexxdj" },
    ],
    featured: true,
  },
  {
    id: "lisima",
    name: "DJ LISIMA",
    realName: "Лія Будник",
    role: "DJ · UA",
    photo: "/residents/lisima.jpg",
    objectPos: "object-top",
    bio: "Українська діджейка. У сетах — House, Indie Dance, Melodic Techno та Tech House: атмосферна електроніка, драйвовий грув і музика, що тримає вайб танцполу.",
    genres: ["House", "Indie Dance", "Melodic Techno", "Tech House"],
    links: [
      { type: "instagram", label: "Instagram", href: "https://www.instagram.com/li_budnyk" },
      {
        type: "soundcloud",
        label: "SoundCloud",
        href: "https://on.soundcloud.com/YMDyzMziW2xpLoUktc",
      },
      { type: "telegram", label: "Telegram", href: "https://t.me/Li_Budnyk" },
    ],
  },
  {
    id: "verum",
    name: "Verum Void",
    realName: "Сергій Дорощук",
    role: "Sound Producer & DJ · UA",
    photo: "/residents/verumvoid.jpg",
    objectPos: "object-[center_20%]",
    bio: "Український sound producer та діджей, офіційний резидент VOL DANCE RADIO. Melodic Techno, Indie Dance, Trance.",
    genres: ["Melodic Techno", "Indie Dance", "Trance"],
    links: [
      { type: "youtube", label: "YouTube", href: "https://www.youtube.com/@VerumVoid" },
      {
        type: "spotify",
        label: "Spotify",
        href: "https://open.spotify.com/artist/0DY8fkAKJeynQzDvHC7bg3?si=BmxiWyGZQSWxGiVSQtydcQ",
      },
      { type: "instagram", label: "Instagram", href: "https://instagram.com/verum_void" },
      { type: "telegram", label: "Telegram", href: "https://t.me/verum_void" },
      { type: "facebook", label: "Facebook", href: "https://facebook.com/sergey.doroshchuk.7" },
      { type: "tiktok", label: "TikTok", href: "https://tiktok.com/@verum_void" },
      { type: "threads", label: "Threads", href: "https://threads.com/@verum_void" },
    ],
  },
  {
    id: "quasar",
    name: "Quasar-89",
    realName: "Олександр Галушко",
    role: "Music Producer & DJ · UA",
    photo: "/residents/quasar.jpg",
    objectPos: "object-top",
    bio: "Український music producer та діджей, офіційний резидент VOL DANCE RADIO. Tech House, Progressive House, Melodic Techno, Electro House.",
    genres: ["Tech House", "Progressive House", "Melodic Techno", "Electro House"],
    links: [
      { type: "instagram", label: "Instagram", href: "https://www.instagram.com/quasar89music/" },
      {
        type: "spotify",
        label: "Spotify",
        href: "https://open.spotify.com/artist/1L8v9aXzezquw8rVInJOe7",
      },
      { type: "soundcloud", label: "SoundCloud", href: "https://soundcloud.com/user-763148322" },
      { type: "telegram", label: "Telegram", href: "https://t.me/Quasar89music" },
      { type: "youtube", label: "YouTube", href: "https://www.youtube.com/@Quasar-89" },
    ],
  },
];

export const SOCIAL_TINT: Record<SocialKind, string> = {
  telegram: "bg-[#229ed9]",
  youtube: "bg-[#ff0033]",
  instagram: "bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]",
  soundcloud: "bg-primary",
  spotify: "bg-[#1db954]",
  facebook: "bg-[#1877f2]",
  tiktok: "bg-foreground/90 text-background",
  threads: "bg-foreground/90 text-background",
};
