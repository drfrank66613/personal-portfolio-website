import { useState, MouseEvent, useRef, useEffect } from "react";
import { ImageGallery } from "../data/projects";
import GalleryThumb from "./GalleryThumb";
import Image from "next/image";
import { gsap } from "gsap";
import { useRouter } from "next/router";

type GalleryLayoutProps = {
  gallery: ImageGallery[];
  viewImage: (image: ImageGallery) => void;
};

const GalleryLayout = ({ gallery, viewImage }: GalleryLayoutProps) => {
  const router = useRouter();
  const container = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [panX, setPanX] = useState<number>(0);

  const main = gallery.find((_, index) => index === 0);
  const sides = gallery.filter((_, index) => index !== 0);

  const onMouseMove = (e: MouseEvent) => {
    const containerMouseX = e.clientX - container.current?.offsetLeft!;

    const xDecimal = containerMouseX / container.current?.offsetWidth!;

    const maxX =
      content.current?.offsetWidth! - container.current?.offsetWidth!;

    setPanX(maxX * xDecimal * -1);

    gsap.to(content.current, {
      duration: 1,
      overwrite: true,
      ease: "power3",
      x: panX,
    });
  };

  useEffect(() => {
    setPanX(0);

    gsap.to(content.current, {
      duration: 0,
      overwrite: true,
      ease: "power3",
      x: 0,
    });
  }, [router.query.projectId]);

  return (
    <>
      {main && (
        <div className="flex flex-col h-full space-y-1">
          <div className="h-[65%] border rounded-lg cursor-pointer">
            <GalleryThumb image={main} viewImage={viewImage} />
          </div>
          <div
            ref={container}
            onMouseMove={onMouseMove}
            className="grow overflow-hidden border-x rounded-lg"
          >
            <div ref={content} className="flex space-x-1 w-fit h-full">
              {sides.map((image) => (
                <div className="w-[290px] h-full border rounded-lg cursor-pointer">
                  <GalleryThumb image={image} viewImage={viewImage} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryLayout;
