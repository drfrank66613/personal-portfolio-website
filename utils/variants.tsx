import { Variants } from "framer-motion";

export const containerVariants: Variants = {
  hidden: {
    height: 0,
    overflow: "hidden",
  },
  visible: {
    height: "100%",
    transition: {
      duration: 0.5,
      when: "beforeChildren",
    },
    transitionEnd: { overflow: "auto" },
  },
  exit: {
    height: 0,
    overflow: "hidden",
    transition: { duration: 0.5 },
  },
};

export const textRevealVariants: Variants = {
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
  exit: {
    opacity: 0,
  },
};

export const contentVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};
