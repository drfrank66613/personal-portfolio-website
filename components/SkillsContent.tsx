import { motion, Variants } from "framer-motion";

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

const SkillsContent = () => {
  const text1 = `Skills`;

  return (
    <motion.div
      className="content-border border rounded-lg rounded-t-none p-4 w-full h-full overflow-y-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        variants={contentVariants}
        className="tracking-widest text-justify"
      >
        {text1.split("").map((char, index) => (
          <motion.span key={char + "-" + index} variants={letterVariants}>
            {char}
          </motion.span>
        ))}
      </motion.p>
    </motion.div>
  );
};

export default SkillsContent;
