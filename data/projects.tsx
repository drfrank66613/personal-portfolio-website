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
          <div>
            <h3>Receptionist</h3>
            <ul>
              <li>
                <span className="text-neutral-400">Dashboard: </span>
                Provides quick information of room availability & occupancy
                rates
              </li>
              <li>
                <span className="text-neutral-400">
                  Reservation Management:{" "}
                </span>
                Allows receptionist to make reservations and assign rooms to
                guests
              </li>
              <li>
                <span className="text-neutral-400">
                  Revenue & Expense Report:{" "}
                </span>
                Generates reports of room revenue and operational expenses
              </li>
            </ul>
          </div>
          <div>
            <h3>Admin</h3>
            <ul>
              <li>
                <span className="text-neutral-400">
                  Room Types Management:{" "}
                </span>
                Allows admin to create various room type categories
              </li>
              <li>
                <span className="text-neutral-400">Bed Types Management: </span>
                Allows admin to create various bed types categories
              </li>
              <li>
                <span className="text-neutral-400">
                  Room-Bed Types Management:{" "}
                </span>
                Allows admin to assign and combine a room type and bed type to
                form a Room-Bed type category
              </li>
              <li>
                <span className="text-neutral-400">Rooms Management: </span>
                Allows admin to create a Room entity with some details
                information and assign the room to the avaialable Room-Bed
                category
              </li>
            </ul>
          </div>
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
        <article>
          <p>
            An official website of The Generations which is a non-governmental
            organization (NGO) based in Kuching, Malaysia. The website provides
            details information of The Generations and their contents for
            public. Furthermore, clients/guests can join The Generations' next
            events/contents or get in touch by filling in the provided online
            form wihtin the site.
          </p>
        </article>
      ),
      full: (
        <article>
          <br />
          <p>
            This responsive website was developed with my colleagues, thus some
            features that I've implemented include:
          </p>
          <ul>
            <li>
              <span className="text-neutral-400">Navigation Bar</span>
            </li>
            <li>
              <span className="text-neutral-400">Hero Video</span>
            </li>
            <li>
              <span className="text-neutral-400">
                Our Featured Guest Section
              </span>
            </li>
          </ul>
        </article>
      ),
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
        <article>
          <p>
            A web-based application developed to provide high-quality learning
            material for children with reading difficulties, improve reading
            proficiency and prepare school professionals a systematic method for
            tracking each child learning level.
          </p>
        </article>
      ),
      full: (
        <article>
          <br />
          <p>
            The website was developed with my colleagues, thus some features
            that I've implemented include:
          </p>
          <ul>
            <li>
              <span className="text-neutral-400">
                CRUD operations for Public Learning Material module with WYSIWYG
                editor
              </span>
            </li>
            <li>
              <span className="text-neutral-400">
                CRUD operations for Admin Announcement module with WYSIWYG
                editor
              </span>
            </li>
            <li>
              <span className="text-neutral-400">
                CRUD operations for Option module
              </span>
            </li>
            <li>
              <span className="text-neutral-400">
                One of Specialized Learning Materials module (Simple Game)
              </span>
            </li>
          </ul>
          <br />
          <p className="text-xs leading-relaxed">
            Note: The application is bound to a Non Disclosure Agreement with
            Research Innovation and Enterprise Centre (RIEC), hence only several
            screenshots of features that I've applied are displayed here
          </p>
        </article>
      ),
    },
  },
];
