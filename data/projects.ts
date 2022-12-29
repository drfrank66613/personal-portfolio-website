type Projects = {
  id: string;
  name: string;
  skills: string[];
  gallery: string[];
  content: string;
}[];

export const Projects: Projects = [
  {
    id: "hotel-management-system",
    name: "Hotel Management System",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "MySQL",
      "React.js",
      "Express.js",
      "TailwindCSS",
      "Sequelize",
      "Redux",
    ],
    gallery: [
      "/hotel-management-system.png",
      "/hotel-management-system.png",
      "/hotel-management-system.png",
    ],
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae consectetur erat. Integer et metus sit amet risus pharetra pulvinar. Integer maximus cursus dui a convallis. Donec ut quam congue, fermentum ante vitae, pellentesque elit. Nunc ultricies elit vitae justo feugiat, vitae euismod erat ornare. Morbi vulputate, massa et mattis volutpat, risus enim dignissim eros, nec imperdiet orci mauris nec est. Fusce nec commodo orci.",
  },
  {
    id: "the-generations-site",
    name: "The Generations Site",
    skills: ["HTML", "CSS", "JavaScript", "React.js", "TailwindCSS"],
    gallery: [
      "/the-generations-site.png",
      "/the-generations-site.png",
      "/the-generations-site.png",
    ],
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae consectetur erat. Integer et metus sit amet risus pharetra pulvinar. Integer maximus cursus dui a convallis. Donec ut quam congue, fermentum ante vitae, pellentesque elit. Nunc ultricies elit vitae justo feugiat, vitae euismod erat ornare. Morbi vulputate, massa et mattis volutpat, risus enim dignissim eros, nec imperdiet orci mauris nec est. Fusce nec commodo orci.",
  },
  {
    id: "dyslexia-site",
    name: "Dyslexia Site",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "MySQL",
      "Vue.js",
      "Laravel",
      "TailwindCSS",
    ],
    gallery: ["/dyslexia-site.png", "/dyslexia-site.png", "/dyslexia-site.png"],
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae consectetur erat. Integer et metus sit amet risus pharetra pulvinar. Integer maximus cursus dui a convallis. Donec ut quam congue, fermentum ante vitae, pellentesque elit. Nunc ultricies elit vitae justo feugiat, vitae euismod erat ornare. Morbi vulputate, massa et mattis volutpat, risus enim dignissim eros, nec imperdiet orci mauris nec est. Fusce nec commodo orci.",
  },
];
