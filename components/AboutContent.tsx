import { motion, useCycle, Variants, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  containerVariants,
  contentVariants,
  letterVariants,
  textRevealVariants,
} from "../utils/variants";

const AboutContent = () => {
  const [animation, cycleAnimation] = useCycle("visible", "animateFaster");

  const text1 = `I am George Kennedy, a software engineer who loves to create new things
  and solve day-to-day problems with the help of technology.`;

  const text2 = `Proficient in using HTML/CSS, JavaScript/TypeScript, React/Next.js, Node/Express.js for
  building Full-Stack Web App. Having basic skills in AI (Python,
    Tensorflow), IoT (Raspberry Pi - Python, Arduino - C++), Mobile App
    Development (Android Studio - Java).`;

  // const text3 = `  Currently interested in
  // working as a Full-stack Web Developer.`;

  return (
    <>
      <div>
        <motion.p variants={textRevealVariants}>
          {text1.split("").map((char, index) => (
            <motion.span key={char + "-" + index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
          <br />
          {text2.split("").map((char, index) => (
            <motion.span key={char + "-" + index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
          {/* <br />
          {text3.split("").map((char, index) => (
            <motion.span key={char + "-" + index} variants={letterVariants}>
              {char}
            </motion.span>
          ))} */}
        </motion.p>
      </div>

      {/* <button onClick={() => cycleAnimation()}>Speed Up</button> */}
    </>
  );
};

export default AboutContent;
