import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { ImageGallery } from "../data/projects";
import Image from "next/image";

type SlideshowProps = {
  gallery: ImageGallery[];
};

const Slideshow = ({ gallery }: SlideshowProps) => {
  const [index, setIndex] = useState<number>(0);
  const [isPrevActive, setIsPrevActive] = useState<boolean>(true);
  const [isNextActive, setIsNextActive] = useState<boolean>(true);

  const prevItem = () => {
    setIndex((prev) => prev - 1);
  };

  const nextItem = () => {
    setIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (index === 0) {
      setIsPrevActive(false);
    } else {
      setIsPrevActive(true);
    }

    if (index === gallery.length - 1) {
      setIsNextActive(false);
    } else {
      setIsNextActive(true);
    }
  }, [index]);

  return (
    <div className="h-full flex items-center">
      {isPrevActive ? (
        <div className="border p-2" onClick={prevItem}>
          {"<"}
        </div>
      ) : (
        <div className="invisible border p-2">{"<"}</div>
      )}
      {gallery[index].type === "video" && (
        <div className="relative h-full w-full border-2 rounded-lg p-[2px]">
          <ReactPlayer
            url={gallery[index].src}
            height="100%"
            width="100%"
            controls
          />
        </div>
      )}
      {gallery[index].type === "image" && (
        <div className="relative h-full w-full border-2 rounded-lg overflow-hidden">
          <Image
            src={gallery[index].src}
            alt={gallery[index].alt}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      {isNextActive ? (
        <div className="border p-2" onClick={nextItem}>
          {">"}
        </div>
      ) : (
        <div className="invisible border p-2">{">"}</div>
      )}
    </div>
  );
};

export default Slideshow;
