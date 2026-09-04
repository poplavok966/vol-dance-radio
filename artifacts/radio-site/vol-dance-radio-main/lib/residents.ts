export type ResidentLink = {
  type:
    | 'telegram'
    | 'youtube'
    | 'instagram'
    | 'soundcloud'
    | 'spotify'
    | 'facebook'
    | 'tiktok'
    | 'threads'
  label: string
  href: string
}

export type Resident = {
  name: string
  realName: string
  role: string
  photo: string
  objectPos: string
  bio: string
  genres: string[]
  links: ResidentLink[]
  featured?: boolean
}

export const RESIDENTS: Resident[] = [
  {
    name: 'Dj Alexx',
    realName: 'Олександр Ганюк',
    role: 'Хедлайнер · Event & Club DJ',
    photo: '/alex.jpg',
    objectPos: 'object-center',
    bio: 'Хедлайнер VOL DANCE RADIO — Event & Club DJ із 16-річним досвідом. Офіційний резидент станції.',
    genres: ['16 років досвіду', 'Event', 'Club'],
    links: [
      { type: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/alexx_dj_/' },
      { type: 'telegram', label: 'Telegram', href: 'https://t.me/alexxdj' },
    ],
    featured: true,
  },
  {
    name: 'DJ LISIMA',
    realName: 'Лія Будник',
    role: 'DJ · UA',
    photo: '/lisima.png',
    objectPos: 'object-top',
    bio: 'Українська діджейка, яка поєднує у своїх сетах House, Indie Dance, Melodic Techno та Tech House. Її стиль — атмосферна електроніка, драйвовий грув і музика, що створює особливий вайб.',
    genres: ['House', 'Indie Dance', 'Melodic Techno', 'Tech House'],
    links: [
      { type: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/li_budnyk' },
      { type: 'soundcloud', label: 'SoundCloud', href: 'https://on.soundcloud.com/YMDyzMziW2xpLoUktc' },
      { type: 'telegram', label: 'Telegram', href: 'https://t.me/Li_Budnyk' },
    ],
  },
  {
    name: 'Verum Void',
    realName: 'Сергій Дорощук',
    role: 'Sound Producer & DJ · UA',
    photo: '/verumvoid.jpg',
    objectPos: 'object-top',
    bio: 'Український Sound Producer та діджей, офіційний резидент VOL DANCE RADIO.',
    genres: ['Melodic Techno', 'Indie Dance', 'Trance'],
    links: [
      { type: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@VerumVoid' },
      { type: 'spotify', label: 'Spotify', href: 'https://open.spotify.com/artist/0DY8fkAKJeynQzDvHC7bg3?si=BmxiWyGZQSWxGiVSQtydcQ' },
      { type: 'instagram', label: 'Instagram', href: 'https://instagram.com/verum_void' },
      { type: 'telegram', label: 'Telegram', href: 'https://t.me/verum_void' },
      { type: 'facebook', label: 'Facebook', href: 'https://facebook.com/sergey.doroshchuk.7' },
      { type: 'tiktok', label: 'TikTok', href: 'https://tiktok.com/@verum_void' },
      { type: 'threads', label: 'Threads', href: 'https://threads.com/@verum_void' },
    ],
  },
  {
    name: 'Quasar-89',
    realName: 'Олександр Галушко',
    role: 'Music Producer & DJ · UA',
    photo: '/gal.jpg',
    objectPos: 'object-top',
    bio: 'Український Music Producer та діджей, офіційний резидент VOL DANCE RADIO.',
    genres: ['Tech House', 'Progressive House', 'Melodic Techno', 'Electro House'],
    links: [
      { type: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/quasar89music/' },
      { type: 'spotify', label: 'Spotify', href: 'https://open.spotify.com/artist/1L8v9aXzezquw8rVInJOe7' },
      { type: 'soundcloud', label: 'SoundCloud', href: 'https://soundcloud.com/user-763148322' },
      { type: 'telegram', label: 'Telegram', href: 'https://t.me/Quasar89music' },
      { type: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@Quasar-89' },
    ],
  },
]
