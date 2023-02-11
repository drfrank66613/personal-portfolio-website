import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { ImageGallery } from "../data/projects";
import Image from "next/image";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useRouter } from "next/router";

type SlideshowProps = {
  gallery: ImageGallery[];
  viewImage: (image: ImageGallery) => void;
};

const Slideshow = ({ gallery, viewImage }: SlideshowProps) => {
  const router = useRouter();
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

  useEffect(() => {
    setIndex(0);
  }, [router.query.projectId]);

  return (
    <div className="h-full flex items-center space-x-1">
      {isPrevActive ? (
        <button className="bg-black p-1 rounded-lg" onClick={prevItem}>
          <AiOutlineLeft size={15} />
        </button>
      ) : (
        <button
          className="invisible bg-black p-1 rounded-lg"
          onClick={prevItem}
        >
          <AiOutlineLeft size={15} />
        </button>
      )}
      {gallery[index]?.type === "video" && (
        <div className="relative h-full w-full border-2 rounded-lg p-[2px]">
          <ReactPlayer
            url={gallery[index].src}
            height="100%"
            width="100%"
            controls
          />
        </div>
      )}
      {gallery[index]?.type === "image" && (
        <div
          className="relative h-full w-full border-2 rounded-lg overflow-hidden"
          onClick={() => viewImage(gallery[index])}
        >
          <Image
            src={gallery[index].src}
            alt={gallery[index].alt}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      {isNextActive ? (
        <button className="bg-black p-1 rounded-lg" onClick={nextItem}>
          <AiOutlineRight size={15} />
        </button>
      ) : (
        <button
          className="invisible bg-black p-1 rounded-lg"
          onClick={nextItem}
        >
          <AiOutlineRight size={15} />
        </button>
      )}
    </div>
  );
};

export default Slideshow;
