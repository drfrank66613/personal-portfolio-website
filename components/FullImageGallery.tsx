import Image from "next/image";
import { useState } from "react";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import type { ImageGallery } from "../data/projects";

type FullImageGalleryProps = {
  viewedImage: ImageGallery;
  gallery: ImageGallery[];
  closeImage: () => void;
};

const FullImageGallery = ({
  viewedImage,
  gallery,
  closeImage,
}: FullImageGalleryProps) => {
  const [currentImage, setCurrentImage] = useState<ImageGallery>(viewedImage);

  const nextImageIdx =
    gallery.findIndex((image) => image.id === currentImage.id) + 1;
  const nextImage = gallery.find((_, index) => nextImageIdx === index);

  const prevImageIdx =
    gallery.findIndex((image) => image.id === currentImage.id) - 1;
  const prevImage = gallery.find((_, index) => prevImageIdx === index);

  const changeImage = (image: ImageGallery) => {
    setCurrentImage(image);
  };

  return (
    <div className="inset-0 fixed h-screen w-screen z-10 bg-neutral-900 bg-opacity-95 flex justify-evenly items-center">
      {prevImage ? (
        <button
          className="cursor-pointer bg-black p-2 rounded-lg"
          onClick={() => changeImage(prevImage)}
        >
          <AiOutlineLeft size={20} />
        </button>
      ) : (
        <div className="invisible p-2">
          <AiOutlineLeft size={20} />
        </div>
      )}

      <div className="relative w-[90%] h-full select-none">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      {nextImage ? (
        <button
          className="cursor-pointer bg-black p-2 rounded-lg"
          onClick={() => changeImage(nextImage)}
        >
          <AiOutlineRight size={20} />
        </button>
      ) : (
        <div className="invisible p-2">
          <AiOutlineRight size={20} />
        </div>
      )}

      <button
        onClick={closeImage}
        className="absolute top-[3%] right-[1.5%] cursor-pointer"
      >
        <AiOutlineClose size={20} />
      </button>
    </div>
  );
};

export default FullImageGallery;
