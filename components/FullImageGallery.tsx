import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import type { ImageGallery } from "../data/projects";
import ReactPlayer from "react-player/youtube";
import { useMediaQuery } from "react-responsive";

type FullImageGalleryProps = {
  isOpen: boolean;
  viewedImage: ImageGallery | null;
  gallery: ImageGallery[];
  closeImage: () => void;
};

const FullImageGallery = ({
  isOpen,
  viewedImage,
  gallery,
  closeImage,
}: FullImageGalleryProps) => {
  const [currentImage, setCurrentImage] = useState<ImageGallery | null>(null);
  const xl2 = useMediaQuery({ minWidth: 2560 });

  const nextImageIdx =
    gallery.findIndex((image) => image.id === currentImage?.id) + 1;
  const nextImage = gallery.find((_, index) => nextImageIdx === index);

  const prevImageIdx =
    gallery.findIndex((image) => image.id === currentImage?.id) - 1;
  const prevImage = gallery.find((_, index) => prevImageIdx === index);

  const changeImage = (image: ImageGallery) => {
    setCurrentImage(image);
  };

  useEffect(() => {
    setCurrentImage(viewedImage);
  }, [viewedImage]);

  return (
    <>
      {isOpen && currentImage && (
        <div className="inset-0 fixed h-screen w-screen z-10 bg-neutral-900 bg-opacity-95 flex justify-evenly items-center">
          {prevImage ? (
            <button
              className="bg-black p-2 2xl:p-3 rounded-lg"
              onClick={() => changeImage(prevImage)}
            >
              <AiOutlineLeft size={xl2 ? 40 : 20} />
            </button>
          ) : (
            <div className="invisible p-2">
              <AiOutlineLeft size={xl2 ? 40 : 20} />
            </div>
          )}

          {currentImage.type === "image" && (
            <div className="relative w-[90%] h-full select-none">
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          )}

          {currentImage.type === "video" && (
            <div className="relative w-[90%] pt-[56.25%] xl:pt-0 h-fit xl:h-full max-h-[95%] select-none">
              <ReactPlayer
                url={currentImage.src}
                height="100%"
                width="100%"
                style={{ position: "absolute", top: 0, left: 0 }}
                controls
              />
            </div>
          )}

          {nextImage ? (
            <button
              className="bg-black p-2 2xl:p-3 rounded-lg"
              onClick={() => changeImage(nextImage)}
            >
              <AiOutlineRight size={xl2 ? 40 : 20} />
            </button>
          ) : (
            <div className="invisible p-2">
              <AiOutlineRight size={xl2 ? 40 : 20} />
            </div>
          )}

          <button
            onClick={closeImage}
            className="absolute top-[3%] right-[1.5%] cursor-pointer"
          >
            <AiOutlineClose size={xl2 ? 40 : 20} />
          </button>
        </div>
      )}
    </>
  );
};

export default FullImageGallery;
