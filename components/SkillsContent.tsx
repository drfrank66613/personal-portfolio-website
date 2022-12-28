import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import {
  containerVariants,
  contentVariants,
  letterVariants,
} from "../utils/variants";

const SkillsContent = () => {
  const skills = [
    {
      category: "languages",
      list: [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "PHP",
        "SQL",
        "NoSQL",
        "Python",
        "Java",
        "C#",
        "C++",
      ],
    },
    {
      category: "tools/technologies",
      list: ["Node.js", "MySQL", "MongoDB", "Git", "GitHub", "Android Studio"],
    },
    {
      category: "frameworks",
      list: ["React.js", "Next.js", "Vue.js", "Express.js", "Laravel"],
    },
  ];

  return (
    <>
      <motion.div
        variants={contentVariants}
        className="flex flex-col justify-between h-full"
      >
        {skills.map(({ category, list }) => (
          <div key={category}>
            <h2>{category}</h2>
            <div>
              {list.map((item, index, list) => {
                const divider = index + 1 === list.length ? "" : " | ";
                return (
                  <label key={item} className="skills-list">
                    {item + divider}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default SkillsContent;
