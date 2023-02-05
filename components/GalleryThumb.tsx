import Image from "next/image";
import { useState } from "react";
import type { ImageGallery } from "../data/projects";
import ReactPlayer from "react-player/youtube";

type GalleryThumbProps = {
  image: ImageGallery;
  viewImage: (image: ImageGallery) => void;
};

const GalleryThumb = ({ image, viewImage }: GalleryThumbProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      {image.type === "image" && (
        <div
          onMouseEnter={toggleActive}
          onMouseLeave={toggleActive}
          onClick={() => viewImage(image)}
          className="relative h-full"
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
      )}
      {image.type === "video" && (
        <div className="relative h-full">
          <div
            className="absolute inset-0"
            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
          ></div>
          <ReactPlayer
            playing={isVideoPlaying}
            url={image.src}
            height="100%"
            width="100%"
            style={{
              overflow: "hidden",
              borderRadius: "0.5rem",
            }}
            controls
          />
        </div>
      )}
    </>
  );
};

export default GalleryThumb;
