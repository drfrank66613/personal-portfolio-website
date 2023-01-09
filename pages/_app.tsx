import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import Logo from "../components/Logo";
import MovingText from "../components/MovingText";
import Marquee from "react-fast-marquee";
import Head from "next/head";
import Link from "next/link";
import AboutContent from "../components/AboutContent";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import {
  MouseEvent,
  TouchEvent,
  BaseSyntheticEvent,
  MouseEventHandler,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { containerVariants } from "../utils/variants";
import { gsap } from "gsap";
import ProjectsContent from "../components/ProjectsContent";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

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
                <Link
                  href={`/${link}`}
                  key={index}
                  className="p-4 relative cursor-pointer"
                  onClick={() => setSelected(link)}
                >
                  <h1 className="capitalize">{link}</h1>
                  {selected === link ? (
                    <motion.div
                      transition={{
                        layout: { duration: 1 },
                        ease: "easeOut",
                      }}
                      layoutId="border"
                      className="absolute inset-0 -bottom-[1px] border border-b-[#0f0f0f] rounded-t-lg z-0"
                    />
                  ) : null}
                </Link>
              ))}
            </nav>
            <AnimatePresence mode="wait">
              <motion.article
                className={`content-border border ${borderTopStyle} rounded-lg overflow-auto`}
                key={currentPath}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="px-5 py-4">
                  <Component {...pageProps} />
                </div>
              </motion.article>
            </AnimatePresence>
          </section>
        </div>
        <div className="h-[50%] pt-2">
          <section className="h-full flex flex-col">
            <h1 className="text-right">Projects</h1>
            <ProjectsContent />
          </section>
        </div>
      </main>
    </div>
  );
}
