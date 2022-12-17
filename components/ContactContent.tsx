import { motion, Variants, AnimatePresence } from "framer-motion";
import {
  containerVariants,
  contentVariants,
  letterVariants,
} from "../utils/variants";

const ContactContent = () => {
  const text1 = `Contact`;

  return (
    <>
      <div
      // key="test"
      // className="content-border border rounded-lg rounded-t-none p-4 w-full h-full overflow-y-auto"
      // variants={containerVariants}
      // initial="hidden"
      // animate="visible"
      // exit="exit"
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
        </motion.p>
      </div>
      {/* <button onClick={() => cycleAnimation()}>Speed Up</button> */}
    </>
  );
};

export default ContactContent;
