import "../styles/globals.css";
import type { AppProps } from "next/app";
import Logo from "../components/Logo";
import MovingText from "../components/MovingText";
import Marquee from "react-fast-marquee";
import Head from "next/head";
import Link from "next/link";
import AboutContent from "../components/AboutContent";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { containerVariants } from "../utils/variants";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const links = ["about", "skills", "contact"];
  const currentPath = router.pathname;
  const initSelected = currentPath === "/" ? "about" : currentPath.slice(1);
  const borderTopStyle =
    currentPath === "/skills"
      ? ""
      : currentPath === "/contact"
      ? "rounded-tr-none"
      : "rounded-tl-none";
  const [selected, setSelected] = useState(initSelected);

  return (
    <div className="h-screen relative">
      <aside className="my-7 mx-3 absolute">
        <MovingText />
      </aside>

      <main className="h-full px-11 py-7">
        <div className="flex h-[50%] space-x-5">
          <aside className="relative h-[110%] min-w-[19%] w-[19%] border rounded-lg">
            <Logo />
          </aside>

          <section className="flex flex-col w-[79%]">
            <nav className="flex justify-between">
              {links.map((link, index) => (
                <div
                  key={index}
                  className="p-4 relative cursor-pointer"
                  onClick={() => {
                    router.push(`/${link}`);
                    setSelected(link);
                  }}
                >
                  <h1 className="capitalize">{link}</h1>
                  {selected === link ? (
                    <motion.div
                      transition={{
                        layout: { duration: 1 },
                        ease: "easeOut",
                      }}
                      layoutId="border"
                      className="absolute inset-0 -bottom-[1px] border border-b-[#1A1A1D] rounded-t-lg z-0"
                    />
                  ) : null}
                </div>
              ))}
            </nav>
            <AnimatePresence mode="wait">
              <motion.article
                className={`content-border h-full px-4 py-1 border ${borderTopStyle} rounded-lg overflow-auto`}
                key={currentPath}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Component {...pageProps} />
              </motion.article>
            </AnimatePresence>
          </section>
        </div>
        <div>
          <section>
            <h1 className="text-right">Projects</h1>
            <div>Contatiner</div>
          </section>
        </div>
      </main>
    </div>
  );
}
