import "../styles/globals.css";
import type { AppProps } from "next/app";
import Logo from "../components/Logo";
import MovingText from "../components/MovingText";
import Marquee from "react-fast-marquee";
import Head from "next/head";
import Link from "next/link";
import AboutContent from "../components/AboutContent";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const links = ["about", "skills", "contact"];
  const activeLinkStyle = "border rounded-lg rounded-b-none border-b-0 p-4";
  const currentPath = router.pathname;
  const initSelected = currentPath === "/" ? "about" : currentPath.slice(1);
  const [selected, setSelected] = useState(initSelected);

  // useEffect(() => {
  //   const currentPath = router.pathname;
  //   const initSelected =
  //     currentPath === "/" ? "about" : router.pathname.slice(1);

  //   setSelected(initSelected);
  // }, []);

  return (
    <>
      <div className="flex h-screen px-10">
        <aside className="absolute">
          <MovingText />
        </aside>

        <main className="mx-10 my-9 flex w-full">
          <aside>
            <Logo />
          </aside>

          <section className="ml-9 w-full">
            <nav className="flex justify-between w-full">
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
                      className="absolute inset-0 border border-b-0 rounded-t-lg z-0"
                    />
                  ) : null}
                </div>
              ))}
            </nav>
            <article className="h-[46%]">
              <Component {...pageProps} />
            </article>
          </section>
        </main>
      </div>
    </>
  );
}
