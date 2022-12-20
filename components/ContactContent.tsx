import { motion, Variants, AnimatePresence } from "framer-motion";
import {
  containerVariants,
  contactContentVariants,
  contentVariants,
  letterVariants,
} from "../utils/variants";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineSend, AiOutlineLoading3Quarters } from "react-icons/ai";
import { SyntheticEvent, useRef, useState } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type Target = {
  value: string;
};

const ContactContent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/contact",
        data
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
    setIsBtnHovered(false);
    setIsLoading(false);
  };
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      variants={contactContentVariants}
      className="h-full flex space-x-5 relative py-4"
    >
      <div className="w-[90%] flex flex-col justify-between">
        <input
          {...register("name")}
          required
          type="text"
          id="name"
          name="name"
          placeholder="Full Name"
          className="hover:border-neutral-500"
        />
        <input
          {...register("email")}
          required
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="hover:border-neutral-500"
        />
        <textarea
          {...register("message")}
          required
          id="message"
          name="message"
          placeholder="Message"
          className="hover:border-neutral-500"
        />
      </div>

      <button
        disabled={isLoading ? true : false}
        className={`border rounded-sm grow flex items-center justify-center ${
          isBtnHovered ? "border-neutral-500" : ""
        }`}
        type="submit"
        onMouseOver={() => setIsBtnHovered(true)}
        onMouseLeave={() => setIsBtnHovered(false)}
      >
        {isLoading ? (
          <RotatingLines
            strokeColor="white"
            strokeWidth="2"
            animationDuration="0.75"
            width="30"
            visible={true}
          />
        ) : (
          <AiOutlineSend
            size={30}
            className={isBtnHovered ? "text-neutral-500" : ""}
          />
        )}
      </button>
    </motion.form>
  );
};

export default ContactContent;
