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
      ? "rounded-tr-none 2xl:rounded-tr-none"
      : "rounded-tl-none 2xl:rounded-tl-none";
  const [selected, setSelected] = useState(initSelected);

  return (
    <div className="h-screen relative">
      <aside className="my-6 md:my-7 mx-3 absolute">
        <MovingText />
      </aside>

      <main className="h-full flex flex-col px-3 md:px-11 2xl:px-20 pt-16 pb-6 md:py-7 ">
        <div className="flex h-fit lg:h-[50%] min-h-[40%] max-h-[50%] lg:space-x-5 xl:space-x-6">
          <aside className="relative lg:h-[109%] xl:h-[108%] 2xl:h-[107%] lg:min-w-[200px] xl:min-w-[250px] 2xl:min-w-[450px] hidden lg:block border 2xl:border-2 rounded-lg 2xl:rounded-xl">
            <Logo />
          </aside>

          <section className="flex flex-col grow">
            <nav className="flex justify-between">
              {links.map((link, index) => (
                <Link
                  href={`/${link}`}
                  key={index}
                  className="px-3 py-4 sm:px-4 sm:py-4 2xl:px-8 2xl:py-9 relative cursor-pointer"
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
                      className="absolute inset-0 border 2xl:border-2 border-b-0 2xl:border-b-0 rounded-t-lg 2xl:rounded-t-xl -z-10"
                    />
                  ) : null}
                </Link>
              ))}
            </nav>
            <AnimatePresence mode="wait">
              <motion.article
                className={`content-border border 2xl:border-2 ${borderTopStyle} rounded-lg 2xl:rounded-xl overflow-auto`}
                key={currentPath}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="px-3 sm:px-5 2xl:px-9 py-3 sm:py-4 2xl:py-8">
                  <Component {...pageProps} />
                </div>
              </motion.article>
            </AnimatePresence>
          </section>
        </div>
        <div className="grow lg:h-[50%] pt-2">
          <section className="h-full flex flex-col">
            <h1 className="text-right">Projects</h1>
            <ProjectsContent />
          </section>
        </div>
      </main>
    </div>
  );
}
