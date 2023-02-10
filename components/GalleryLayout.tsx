import { useState, PointerEvent, useRef, useEffect } from "react";
import type { ImageGallery } from "../data/projects";
import GalleryThumb from "./GalleryThumb";
import { motion, useDragControls } from "framer-motion";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import Slideshow from "./Slideshow";

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
  const [isDurationZero, setIsDurationZero] = useState<boolean>(false);
  const [isMomentumOn, setIsMomentumOn] = useState<boolean>(true);
  const [constraint, setConstraint] = useState<number>(0);
  const controls = useDragControls();
  const md = useMediaQuery({ minWidth: 768 });

  const main = gallery.find((_, index) => index === 0);
  const sides = gallery.filter((_, index) => index !== 0);

  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType === "mouse") {
      const containerMouseX = e.clientX - container.current?.offsetLeft!;

      const xDecimal = containerMouseX / container.current?.offsetWidth!;

      const maxX =
        content.current?.offsetWidth! - container.current?.offsetWidth!;

      setPanX(maxX * xDecimal * -1);
    }
  };

  const toggleMomentum = (e: PointerEvent) => {
    if (e.pointerType === "touch") {
      const x = Number(
        content.current?.style.transform
          .split(" ")[0]
          .replace(/[^0-9\.]+/g, "")!
      );

      setConstraint(x);

      if (x === constraint) {
        setIsMomentumOn(false);
        return;
      }

      setIsMomentumOn(true);
    }
  };

  useEffect(() => {
    setPanX(0);

    setIsDurationZero(true);
  }, [router.query.projectId, md]);

  return (
    <>
      {md ? (
        main && (
          <div className="flex flex-col h-full space-y-1 2xl:space-y-2">
            <div
              ref={mainEl}
              className="h-[65%] border 2xl:border-2 rounded-lg cursor-pointer"
            >
              <GalleryThumb image={main} viewImage={viewImage} />
            </div>
            <div
              ref={container}
              onPointerMove={onPointerMove}
              className="grow overflow-hidden border-x rounded-lg"
            >
              <motion.div
                drag="x"
                dragConstraints={container}
                dragElastic={0}
                dragTransition={{ timeConstant: 200, power: 0.2 }}
                dragControls={controls}
                dragMomentum={isMomentumOn}
                onPointerMove={toggleMomentum}
                onAnimationComplete={() => {
                  setIsDurationZero(false);
                }}
                animate={{ x: panX }}
                transition={{
                  ease: "easeOut",
                  duration: isDurationZero ? 0 : 0.5,
                }}
                ref={content}
                className="flex space-x-1 2xl:space-x-2 w-fit h-full"
              >
                {sides.map((image) => (
                  <div className="md:w-[135px] lg:w-[190px] xl:w-[290px] 2xl:w-[550px] h-full border 2xl:border-2 rounded-lg cursor-pointer">
                    <GalleryThumb image={image} viewImage={viewImage} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        )
      ) : (
        <div className="h-[80%]">
          <Slideshow gallery={gallery} viewImage={viewImage} />
        </div>
      )}
    </>
  );
};

export default GalleryLayout;
