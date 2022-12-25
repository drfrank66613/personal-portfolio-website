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

  // Projects Section
  // const [mouseXPos, setMouseXPos] = useState<number | null>(null);

  const scroller = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [overflow, setOverflow] = useState<number>(0);
  const [mapPosition, setMapPosition] = useState<Function>(Function);

  const onResize = () => {
    setWindowWidth(window.innerWidth);
    setOverflow(contentWidth - windowWidth);
    setMapPosition(() =>
      gsap.utils.mapRange(0, windowWidth, overflow / 2, overflow / -2)
    );
  };

  const onMouseMove = (e: MouseEvent) => {
    if (overflow > 0) {
      let x = e.clientX || 0;

      gsap.to(scroller.current, {
        duration: 1,
        overwrite: true,
        ease: "power3",
        x: mapPosition(x),
      });
    }
  };

  useEffect(() => {
    setContentWidth(scroller.current?.offsetWidth!);
    setWindowWidth(window.innerWidth);
    setOverflow(contentWidth - windowWidth);
    setMapPosition(() =>
      gsap.utils.mapRange(0, windowWidth, overflow / 2, overflow / -2)
    );

    console.log("windowWidth", windowWidth);
    console.log("contentWidth", contentWidth);
    console.log("overflow", overflow);

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [windowWidth, contentWidth, overflow]);

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
        <div
          className="h-[50%] pt-2 bg-purple-500"
          // onMouseMove={(e) => console.log(e)}
        >
          <section className="h-full flex flex-col">
            <h1 className="text-right">{windowWidth}</h1>
            <div
              className="h-full w-full flex items-center justify-center overflow-hidden relative bg-gray-500"
              // onLoadCapture={() => console.log("test")}
              onMouseMove={onMouseMove}
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                  className="flex justify-center items-center bg-white text-black text-center"
                  ref={scroller}
                >
                  <div className="mx-96 border border-black">1</div>
                  <div className="mx-96 border border-black">2</div>
                  <div className="mx-96 border border-black">3</div>
                  <div className="mx-96 border border-black">4</div>
                  <div className="mx-96 border border-black">5</div>
                  <div className="mx-96 border border-black">6</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
