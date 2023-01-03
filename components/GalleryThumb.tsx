import Image from "next/image";
import { useState } from "react";
import type { ImageGallery } from "../data/projects";

type GalleryThumbProps = {
  index: number;
  image: ImageGallery;
  viewImage: (image: ImageGallery) => void;
};

const GalleryThumb = ({ index, image, viewImage }: GalleryThumbProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      onMouseEnter={toggleActive}
      onMouseLeave={toggleActive}
      onClick={() => viewImage(image)}
      className={
        index === 0
          ? "col-span-2 row-span-2 h-full w-full relative border rounded-lg cursor-pointer"
          : "h-full w-full border rounded-lg relative cursor-pointer"
      }
    >
      {isActive && (
        <div className="absolute bg-neutral-900 bg-opacity-90 rounded-lg flex justify-center items-center h-full w-full z-10">
          <h2 className="text-white px-2 py-1 rounded-lg">Click to view</h2>
        </div>
      )}

      <Image
        src={image.src}
        alt={image.alt}
        fill
        style={{ objectFit: "cover", borderRadius: "0.5rem" }}
      />
    </div>
  );
};

export default GalleryThumb;
