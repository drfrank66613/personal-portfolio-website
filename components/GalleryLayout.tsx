import { useState, MouseEvent, TouchEvent, useRef, useEffect } from "react";
import type { ImageGallery } from "../data/projects";
import GalleryThumb from "./GalleryThumb";
import Image from "next/image";
import { motion, useDragControls } from "framer-motion";
import { gsap } from "gsap";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";

type GalleryLayoutProps = {
  gallery: ImageGallery[];
  viewImage: (image: ImageGallery) => void;
};

const GalleryLayout = ({ gallery, viewImage }: GalleryLayoutProps) => {
  const router = useRouter();
  const container = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const mainEl = useRef<HTMLDivElement>(null);
  const [panX, setPanX] = useState<number>(0);
  const [touchStartX, setTouchStartX] = useState<number>(0);
  const [isDurationZero, setIsDurationZero] = useState<boolean>(false);
  const md = useMediaQuery({ minWidth: 768 });

  const main = gallery.find((_, index) => index === 0);
  const sides = gallery.filter((_, index) => index !== 0);

  const onMouseMove = (e: MouseEvent) => {
    const containerMouseX = e.clientX - container.current?.offsetLeft!;

    const xDecimal = containerMouseX / container.current?.offsetWidth!;

    const maxX =
      content.current?.offsetWidth! - container.current?.offsetWidth!;

    setPanX(maxX * xDecimal * -1);
  };

  // const onTouchStart = (e: TouchEvent) => {
  //   let containerClientX =
  //     e.targetTouches[0].clientX - container.current?.offsetLeft!;

  //   if (containerClientX < 0) {
  //     containerClientX = 0;
  //   }
  //   if (containerClientX > container.current?.offsetWidth!) {
  //     containerClientX = container.current?.offsetWidth!;
  //   }

  //   setTouchStartX(containerClientX);
  // };

  // const onTouchMove = (e: TouchEvent) => {
  //   let containerClientX =
  //     e.targetTouches[0].clientX - container.current?.offsetLeft!;

  //   if (containerClientX < 0) {
  //     containerClientX = 0;
  //   }
  //   if (containerClientX > container.current?.offsetWidth!) {
  //     containerClientX = container.current?.offsetWidth!;
  //   }

  //   setTouchStartX(containerClientX);

  //   if (touchStartX < e.targetTouches[0].clientX) {
  //     setPanX((prev) => prev - (touchStartX - containerClientX));
  //   }
  //   if (touchStartX > e.targetTouches[0].clientX) {
  //     setPanX((prev) => prev + (containerClientX - touchStartX));
  //   }
  // };

  // useEffect(() => {
  //   const minX = content.current?.offsetLeft! - container.current?.offsetLeft!;

  //   const maxX =
  //     content.current?.offsetWidth! - container.current?.offsetWidth!;

  //   if (panX < -maxX) {
  //     setPanX(-maxX);
  //   }
  //   if (panX > minX) {
  //     setPanX(minX);
  //   }
  // }, [panX]);

  useEffect(() => {
    setPanX(0);

    setIsDurationZero(true);
  }, [router.query.projectId, md]);

  const controls = useDragControls();

  console.log("render");

  return (
    <>
      {md ? (
        main && (
          <div className="flex flex-col h-full space-y-1">
            <div
              ref={mainEl}
              className="h-[65%] border rounded-lg cursor-pointer"
            >
              <GalleryThumb image={main} viewImage={viewImage} />
            </div>
            <div
              ref={container}
              onMouseMove={onMouseMove}
              // onTouchStart={onTouchStart}
              // onTouchMove={onTouchMove}
              className="grow overflow-hidden border-x rounded-lg"
            >
              <motion.div
                drag="x"
                dragConstraints={container}
                dragElastic={0}
                dragTransition={{ timeConstant: 200, power: 0.2 }}
                dragControls={controls}
                onAnimationComplete={() => {
                  setIsDurationZero(false);
                }}
                // dragSnapToOrigin={isDurationZero ? true : false}
                // initial={{ x: 0 }}
                animate={{ x: panX }}
                transition={{
                  ease: "easeOut",
                  duration: isDurationZero ? 0 : 0.5,
                }}
                ref={content}
                className="flex space-x-1 w-fit h-full"
              >
                {sides.map((image) => (
                  <div className="md:w-[230px] lg:w-[290px] h-full border rounded-lg cursor-pointer">
                    <GalleryThumb image={image} viewImage={viewImage} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        )
      ) : (
        <div
          ref={container}
          onMouseMove={onMouseMove}
          // onTouchStart={onTouchStart}
          // onTouchMove={onTouchMove}
          className="h-[80%] overflow-hidden border-x-2 rounded-lg"
        >
          <motion.div
            drag="x"
            dragConstraints={container}
            dragElastic={0}
            dragTransition={{ timeConstant: 200, power: 0.2 }}
            onAnimationComplete={() => {
              setIsDurationZero(false);
            }}
            dragControls={controls}
            // dragSnapToOrigin={true}
            // dragListener={false}
            animate={{ x: panX }}
            transition={{ ease: "easeOut", duration: isDurationZero ? 0 : 0.5 }}
            ref={content}
            className="flex h-full space-x-2 w-fit text-black"
          >
            {gallery.map((image, index) => (
              <div className="w-[370px] sm:w-[500px] h-full border rounded-lg cursor-pointer">
                <GalleryThumb image={image} viewImage={viewImage} />
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default GalleryLayout;
