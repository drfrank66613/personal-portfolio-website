import { motion } from "framer-motion";
import Image from "next/image";
import languages from "../data/languages.json";
import Marquee from "react-fast-marquee";

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
      <div className="flex flex-col justify-around h-full">
        {skills.map(({ category, list }) => (
          <div className="">
            <h2>{category}</h2>
            <div className="">
              {list.map((item, index, list) => {
                const divider = index + 1 === list.length ? "" : " | ";
                return <label>{item + divider}</label>;
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkillsContent;
