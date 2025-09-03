export const HEADER_HEIGHT = 80
export const ROOT_MARGIN = `-${HEADER_HEIGHT}px 0px -55% 0px`

export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },

  { id: 'contact', label: 'Contact' },
]

export const CAPABILITIES = [
  {
    slug: "brand-identity",
    title: "Brand Identity",
    blurb: "Logos, marks, systems, and style guides.",
    hero: "/assets/capabilities/brand-identity/hero.jpg",
    projects: [
      {
        slug: "volvo-850-retropack",
        title: "Volvo 850 Retro Pack",
        year: "2024",
        role: ["Design", "Art Direction"],
        cover: "/assets/projects/volvo-850/cover.jpg",
        tags: ["logo", "system", "print"],
        media: [
          "/assets/projects/volvo-850/01.jpg",
          "/assets/projects/volvo-850/02.jpg",
          "/assets/projects/volvo-850/03.mp4",
        ],
        summary:
          "A tactile, Windows-95-meets-Volvo system across print & web.",
        caseStudy: "/case-studies/volvo-850.md",
        links: { live: "", repo: "" },
      },
    ],
  },
  {
    slug: "web-experiences",
    title: "Web Experiences",
    blurb: "Playful, performant web builds with Tailwind + React.",
    hero: "/assets/capabilities/web-experiences/hero.jpg",
    projects: [/* ... */],
  },
];

export const SITE = {
  name: "Grace Homer",
  basePath: "/",
};