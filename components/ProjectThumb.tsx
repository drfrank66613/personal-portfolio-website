import Image from "next/image";
import { useState } from "react";

type ProjectThumbsProps = {
  src: string;
  alt: string;
};

const ProjectThumb = ({ src, alt }: ProjectThumbsProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      onMouseEnter={toggleActive}
      onMouseLeave={toggleActive}
      className="mx-1 relative h-full w-[600px] border rounded-lg grayscale hover:grayscale-0 hover:cursor-pointer"
      onClick={() => console.log("clicked")}
    >
      {isActive && (
        <div className="absolute bg-transparent flex justify-center items-center h-full w-full z-10">
          <h2 className="bg-neutral-900 bg-opacity-80 text-white px-2 py-1 rounded-lg">
            {alt}
          </h2>
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        fill
        priority
        style={{ borderRadius: "0.5rem" }}
      />
    </div>
  );
};

export default ProjectThumb;
