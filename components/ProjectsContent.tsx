import { useRef, useState, useEffect, MouseEvent, TouchEvent } from "react";
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

    console.log(containerMouseX);

    // console.log(panX);
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

  const [touchStart, setTouchStart] = useState<number>(0);

  const onTouchStart = (e: TouchEvent) => {
    let containerMouseX =
      e.targetTouches[0].clientX - container.current?.offsetLeft!;

    if (containerMouseX < 0) {
      containerMouseX = 0;
    }

    setTouchStart(containerMouseX);
  };

  // const onTouchEnd = (e: TouchEvent) => {
  //   setTouchStart(0);
  // };

  //FIX touch event

  const onTouchMove = (e: TouchEvent) => {
    // console.log(e.targetTouches[0].clientX);
    // setTouchStart(e.targetTouches[0].clientX);

    // console.log(window.innerWidth);

    let containerMouseX =
      e.targetTouches[0].clientX - container.current?.offsetLeft!;
    if (containerMouseX < 0) {
      containerMouseX = 0;
    }

    // console.log(containerMouseX);

    const xDecimal = containerMouseX / container.current?.offsetWidth!;

    const maxX =
      content.current?.offsetWidth! - container.current?.offsetWidth!;

    // if (containerMouseX < 0) {
    //   setPanX(0);
    // } else if (containerMouseX > container.current?.offsetWidth!) {
    //   setPanX(maxX * -1);
    // } else {
    // if (containerMouseX > touchStart) {
    //   setPanX(touchStart - containerMouseX);
    // } else if (containerMouseX < touchStart) {
    setPanX(touchStart - containerMouseX);
    // }
    // }

    console.log("containerMouseX:", containerMouseX);
    console.log("touchStart:", touchStart);
    console.log("panX:", panX);

    // console.log(content);

    gsap.to(content.current, {
      duration: 1,
      overwrite: true,
      ease: "power3",
      translateX: `-=${panX}`,
    });
  };

  // useEffect(() => {
  //   if (panX > 0) setPanX(0);
  // }, [panX]);

  return (
    <div
      ref={container}
      className="h-full w-full overflow-hidden border-x-2 rounded-lg"
      onMouseMove={onMouseMove}
      onTouchStart={onTouchStart}
      // onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
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
