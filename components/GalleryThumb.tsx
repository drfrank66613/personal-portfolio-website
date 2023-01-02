import Image from "next/image";
import { useState } from "react";

type Gallery = {
  src: string;
  alt: string;
};

type GalleryThumbProps = {
  index: number;
  gallery: Gallery;
  viewImage: (image: Gallery) => void;
};

const GalleryThumb = ({ index, gallery, viewImage }: GalleryThumbProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      onMouseEnter={toggleActive}
      onMouseLeave={toggleActive}
      onClick={() => viewImage(gallery)}
      className={
        index === 0
          ? "col-span-2 row-span-2 h-full w-full relative border rounded-lg cursor-pointer"
          : "h-full w-full border rounded-lg relative cursor-pointer"
      }
    >
      {isActive && (
        <div className="absolute bg-black bg-opacity-50 flex justify-center items-center h-full w-full z-10">
          <h2 className="bg-neutral-900 bg-opacity-80 text-white px-2 py-1 rounded-lg">
            Click to view
          </h2>
        </div>
      )}

      <Image
        src={gallery.src}
        alt={gallery.alt}
        fill
        style={{ objectFit: "cover", borderRadius: "0.5rem" }}
      />
    </div>
  );
};

export default GalleryThumb;
