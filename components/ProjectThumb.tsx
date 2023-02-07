import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type ProjectThumbsProps = {
  src: string;
  alt: string;
  id: string;
};

const ProjectThumb = ({ src, alt, id }: ProjectThumbsProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <Link
      href={`/projects/${id}`}
      onMouseEnter={toggleActive}
      onMouseLeave={toggleActive}
      className="relative h-full w-[510px] lg:w-[550px] xl:w-[800px] border xl:border-2 rounded-lg cursor-pointer"
    >
      {isActive && (
        <div className="absolute bg-neutral-900 rounded-lg bg-opacity-90 flex justify-center items-center h-full w-full z-10">
          <h2 className="text-white px-2 py-1 rounded-lg">{alt}</h2>
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        fill
        priority
        style={{ borderRadius: "0.5rem", objectFit: "cover" }}
      />
    </Link>
  );
};

export default ProjectThumb;
