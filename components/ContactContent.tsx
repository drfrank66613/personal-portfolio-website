import { motion, Variants, AnimatePresence } from "framer-motion";
import {
  containerVariants,
  contactContentVariants,
  contentVariants,
  letterVariants,
} from "../utils/variants";
import CustomInput from "./CustomInput";

const ContactContent = () => {
  return (
    <motion.form
      variants={contactContentVariants}
      className="h-full flex flex-col justify-evenly"
    >
      <input type="text" id="name" name="name" placeholder="Full Name" />
      <input type="email" id="email" name="email" placeholder="Email" />
      <input type="phone" id="phone" name="phone" placeholder="Phone" />
      <textarea id="message" name="message" placeholder="Message" />
    </motion.form>
  );
};

export default ContactContent;
