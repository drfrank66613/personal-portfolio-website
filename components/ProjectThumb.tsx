import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

type ProjectThumbsProps = {
  src: string;
  alt: string;
  id: string;
};

const ProjectThumb = ({ src, alt, id }: ProjectThumbsProps) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const handleClick = () => {
    router.push(`/projects/${id}`);
  };

  return (
    <div
      onMouseEnter={toggleActive}
      onMouseLeave={toggleActive}
      className="mx-1 relative h-full w-[600px] border rounded-lg grayscale hover:grayscale-0 cursor-pointer"
      onClick={handleClick}
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
