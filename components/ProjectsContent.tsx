import { useRef, useState, useEffect, MouseEvent } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import ProjectThumb from "./ProjectThumb";
import { Projects } from "../data/projects";

const ProjectsContent = () => {
  // const scroller = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [panX, setPanX] = useState<number>(0);
  const [contentWidth, setContentWidth] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [overflow, setOverflow] = useState<number>(0);
  const [mapPosition, setMapPosition] = useState<Function>(Function);

  // const initMapPosition = () =>
  //   gsap.utils.mapRange(0, windowWidth, overflow / 2, overflow / -2);

  // const onResize = () => {
  //   setWindowWidth(window.innerWidth);
  //   setOverflow(contentWidth - windowWidth);
  //   setMapPosition(initMapPosition);
  // };

  const onMouseMove = (e: MouseEvent) => {
    const containerMouseX = e.clientX - container.current?.offsetLeft!;

    const xDecimal = containerMouseX / container.current?.offsetWidth!;

    const maxX =
      content.current?.offsetWidth! - container.current?.offsetWidth!;

    setPanX(maxX * xDecimal * -1);

    gsap.to(content.current, {
      duration: 1,
      overwrite: true,
      ease: "power3",
      x: panX,
    });
    // if (overflow > 0) {
    //   let x = e.clientX || 0;

    //   gsap.to(scroller.current, {
    //     duration: 1,
    //     overwrite: true,
    //     ease: "power3",
    //     x: mapPosition(x),
    //   });

    //   return;
    // }

    // gsap.to(scroller.current, {
    //   duration: 1,
    //   overwrite: true,
    //   ease: "power3",
    //   x: 0,
    // });
  };

  // useEffect(() => {
  //   setPanX(0);

  //   gsap.to(content.current, {
  //     duration: 0,
  //     overwrite: true,
  //     ease: "power3",
  //     x: 0,
  //   });
  // }, [windowWidth, contentWidth, overflow]);

  return (
    <div
      ref={container}
      className="h-full w-full overflow-hidden border-x-2 rounded-lg"
      onMouseMove={onMouseMove}
    >
      <div className="flex h-full space-x-2 w-fit text-black" ref={content}>
        {Projects.map(({ id, name }, index) => (
          <ProjectThumb key={index} src={`/${id}.png`} alt={name} id={id} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsContent;
