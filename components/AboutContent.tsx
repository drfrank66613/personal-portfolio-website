import { motion, useCycle, Variants } from "framer-motion";
import { useState } from "react";

const containerVariants: Variants = {
  hidden: {
    height: 0,
    overflowY: "hidden",
  },
  visible: {
    height: "100%",
    transition: { duration: 0.5, when: "beforeChildren" },
    transitionEnd: { overflowY: "auto" },
  },
};

const contentVariants: Variants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.006,
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const AboutContent = () => {
  const [animation, cycleAnimation] = useCycle("visible", "animateFaster");

  const text1 = `I am George Kennedy, a software engineer who loves to create new things
  and solve day-to-day problems with the help of technology. Having some
  experience in Web & Mobile Development, Artificial Intelligence,
  Internet of Things as well as Cloud Computing. Currently interested in
  working as a Full-stack Web Developer.`;

  const text2 = `Proficient in using HTML/CSS, JavaScript, React, Node/Express for
  building Full-Stack Web App. Having basic skills in AI (Python,
  Tensorflow), IoT (Raspberry Pi - Python, Arduino - C++), Mobile App
  Development (Android Studio - Java). Lastly, it is a pleasure for me if
  my applications can have a huge impact on society.`;

  return (
    <>
      <motion.div
        className="content-border border rounded-lg rounded-t-none p-4 w-full h-full overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={contentVariants}
          // initial="hidden"
          // animate={animation}
          className="tracking-widest text-justify"
        >
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
        </motion.p>
      </motion.div>
      {/* <button onClick={() => cycleAnimation()}>Speed Up</button> */}
    </>
  );
};

export default AboutContent;
