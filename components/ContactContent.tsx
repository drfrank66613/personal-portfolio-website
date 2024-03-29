import { motion, Variants, AnimatePresence } from "framer-motion";
import {
  containerVariants,
  contentVariants,
  letterVariants,
} from "../utils/variants";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineSend, AiOutlineLoading3Quarters } from "react-icons/ai";
import { SyntheticEvent, useRef, useState } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

const ContactContent = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const xl2 = useMediaQuery({ minWidth: 2560 });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setIsBtnHovered(true);
    const response = axios.post("http://localhost:3000/api/contact", data);

    await toast.promise(response, {
      loading: "Loading ...",
      success: (data) => {
        console.log(data);
        if (data.status === 500)
          throw new Error("Server error. Please try again in a while!");
        return "Thank you for contacting me!";
      },
      error: "Sorry, I couldn't be reached. Please try again!",
    });
    setIsLoading(false);
    setIsBtnHovered(false);
    reset();
  };

  return (
    <div className="relative">
      <Toaster
        containerStyle={{
          top: 0,
          position: "absolute",
        }}
        toastOptions={{
          style: {
            letterSpacing: "0.1em",
            color: "white",
            border: "1px solid white",
            backgroundColor: "#1A1A1D",
            fontFamily: "krete serif",
          },
        }}
      />
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        variants={contentVariants}
        className="h-full flex space-x-3 2xl:space-x-5 relative py-4"
      >
        {/* w-[90%] md:w-[86%] lg:w-[87%] xl:w-[90%] */}
        <div className="grow flex flex-col space-y-3 2xl:space-y-5">
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
          className={`border 2xl:border-2 rounded-sm min-w-[20%] sm:min-w-[10%] flex items-center justify-center ${
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
              width={xl2 ? "50" : "25"}
              visible={true}
            />
          ) : (
            <AiOutlineSend
              size={xl2 ? 50 : 25}
              className={isBtnHovered ? "text-neutral-500" : ""}
            />
          )}
        </button>
      </motion.form>
    </div>
  );
};

export default ContactContent;
