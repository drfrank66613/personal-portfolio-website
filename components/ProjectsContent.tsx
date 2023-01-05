import { useRef, useState, useEffect, MouseEvent } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import ProjectThumb from "./ProjectThumb";
import { Projects } from "../data/projects";

const ProjectsContent = () => {
  const scroller = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [overflow, setOverflow] = useState<number>(0);
  const [mapPosition, setMapPosition] = useState<Function>(Function);

  const initMapPosition = () =>
    gsap.utils.mapRange(0, windowWidth, overflow / 2, overflow / -2);

  const onResize = () => {
    setWindowWidth(window.innerWidth);
    setOverflow(contentWidth - windowWidth);
    setMapPosition(initMapPosition);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (overflow > 0) {
      let x = e.clientX || 0;

      gsap.to(scroller.current, {
        duration: 1,
        overwrite: true,
        ease: "power3",
        x: mapPosition(x),
      });

      return;
    }

    gsap.to(scroller.current, {
      duration: 1,
      overwrite: true,
      ease: "power3",
      x: 0,
    });
  };

  useEffect(() => {
    setContentWidth(scroller.current?.offsetWidth!);
    setWindowWidth(window.innerWidth);
    setOverflow(contentWidth - windowWidth);
    setMapPosition(initMapPosition);

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [windowWidth, contentWidth, overflow]);

  return (
    <div
      className="h-full w-full flex items-center justify-center overflow-hidden relative border-x-2 rounded-lg"
      onMouseMove={onMouseMove}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full">
        <div
          className="flex justify-center items-center text-black h-full"
          ref={scroller}
        >
          {Projects.map(({ id, name }, index) => (
            <ProjectThumb key={index} src={`/${id}.png`} alt={name} id={id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsContent;
