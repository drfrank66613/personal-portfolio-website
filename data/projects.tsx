import { ReactNode } from "react";

type Projects = {
  id: string;
  name: string;
  skills: string[];
  gallery: string[];
  content: {
    initial: ReactNode;
    full: ReactNode;
  };
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
    content: {
      initial: (
        <article>
          <p>
            A software application that helps hotels to manage their daily
            operations, including reservations, check-ins, check-outs, and room
            assignments. It allows hotel staff to efficiently handle a high
            volume of guests and reservations, and provides a range of tools to
            streamline operations and improve customer service.
          </p>
        </article>
      ),
      full: (
        <article>
          <br />
          <p>Some key features of the hotel management system include:</p>
          <ul>
            <li>
              <span style={{ color: "GrayText" }}>Dashboard: </span>
              Provides quick information of room availability & occupancy rates
            </li>
            <li>
              <span style={{ color: "GrayText" }}>
                Reservation Management:{" "}
              </span>
              Allows hotel staff to make reservations and assign rooms to guests
            </li>
          </ul>
        </article>
      ),
    },
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
    content: {
      initial: (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae
          consectetur erat. Integer et metus sit amet risus pharetra pulvinar.
          Integer maximus cursus dui a convallis. Donec ut quam congue,
          fermentum ante vitae, pellentesque elit. Nunc ultricies elit vitae
          justo feugiat, vitae euismod erat ornare. Morbi vulputate, massa et
          mattis volutpat, risus enim dignissim eros, nec imperdiet orci mauris
          nec est. Fusce nec commodo orci.
        </p>
      ),
      full: <p>Expanded content</p>,
    },
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
    content: {
      initial: (
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae
          consectetur erat. Integer et metus sit amet risus pharetra pulvinar.
          Integer maximus cursus dui a convallis. Donec ut quam congue,
          fermentum ante vitae, pellentesque elit. Nunc ultricies elit vitae
          justo feugiat, vitae euismod erat ornare. Morbi vulputate, massa et
          mattis volutpat, risus enim dignissim eros, nec imperdiet orci mauris
          nec est. Fusce nec commodo orci.
        </p>
      ),
      full: <p>Expanded content</p>,
    },
  },
];
