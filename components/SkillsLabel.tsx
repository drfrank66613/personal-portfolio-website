import {
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
  WheelEvent,
} from "react";
import type { Project } from "../data/projects";
import { useMediaQuery } from "react-responsive";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

type SkillsLabelProps = {
  project: Project;
  scrollableContent: RefObject<HTMLDivElement>;
};

const SkillsLabel = ({ project, scrollableContent }: SkillsLabelProps) => {
  const router = useRouter();
  const container = useRef<HTMLDivElement>(null);
  const scrollableLabel = useRef<HTMLDivElement>(null);
  const [isLeftArrowHidden, setIsLeftArrowHidden] = useState<boolean>(true);
  const [isRightArrowHidden, setIsRightArrowHidden] = useState<boolean>(true);

  const md = useMediaQuery({ minWidth: 768 });

  // const preventDefault = useMemo(() => (e: any) => e.preventDefault(), []);

  // const disableContentScrollable = () => {
  //   scrollableContent.current?.addEventListener("wheel", preventDefault, {
  //     passive: false,
  //   });
  // };

  // const enableContentScrollable = () => {
  //   scrollableContent.current?.removeEventListener(
  //     "wheel",
  //     preventDefault,
  //     false
  //   );
  // };

  // const onLabelWheel = (e: WheelEvent<HTMLDivElement>) => {
  //   if (scrollableLabel.current) {
  //     scrollableLabel.current.scrollLeft += e.deltaY;

  //     const offsetLeft = scrollableLabel.current.offsetLeft;
  //     const offsetWidth = scrollableLabel.current.offsetWidth;
  //     const scrollWidth = scrollableLabel.current.scrollWidth;
  //     const scrollLeft = scrollableLabel.current.scrollLeft;

  //     if (offsetLeft == scrollLeft) {
  //       setIsLeftArrowHidden(true);
  //     } else {
  //       setIsLeftArrowHidden(false);
  //       setIsRightArrowHidden(false);
  //     }

  //     if (offsetWidth + scrollLeft + 1 >= scrollWidth) {
  //       setIsRightArrowHidden(true);
  //     } else {
  //       setIsRightArrowHidden(false);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   // scrollableLabel.current?.scrollTo(0, 0);

  //   if (
  //     scrollableLabel.current?.offsetWidth !=
  //     scrollableLabel.current?.scrollWidth
  //   ) {
  //     setIsRightArrowHidden(false);
  //   } else {
  //     setIsRightArrowHidden(true);
  //   }

  //   if (
  //     scrollableLabel.current?.offsetLeft != scrollableLabel.current?.scrollLeft
  //   ) {
  //     setIsLeftArrowHidden(false);
  //   } else {
  //     setIsLeftArrowHidden(true);
  //   }

  //   if (scrollableLabel.current?.scrollLeft != 0) {
  //     scrollableLabel.current?.scrollTo(0, 0);
  //   }

  //   console.log(scrollableLabel.current?.scrollLeft);
  //   console.log(scrollableLabel.current?.offsetLeft);
  // }, [
  //   router.query.projectId,
  //   scrollableLabel.current?.scrollLeft,
  //   scrollableLabel.current?.offsetWidth,
  // ]);

  // // Re-render on browser resize
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  // const setWindowDimensions = () => {
  //   setWindowWidth(window.innerWidth);
  //   setWindowHeight(window.innerHeight);
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", setWindowDimensions);
  //   return () => {
  //     window.removeEventListener("resize", setWindowDimensions);
  //   };
  // }, []);

  return (
    <div className="relative overflow-x-hidden" ref={container}>
      {md || isLeftArrowHidden || (
        <div className="absolute inset-y-0 left-0 bg-[#0f0f0f] shadow-[10px_0_10px] shadow-[#0f0f0f] w-5 flex justify-center items-center">
          <BiChevronLeft />
        </div>
      )}
      <motion.div
        className="whitespace-nowrap w-fit md:w-full md:whitespace-normal"
        ref={scrollableLabel}
        drag="x"
        dragConstraints={container}
        dragElastic={0}
        dragMomentum={false}
        // onWheel={onLabelWheel}
        // onMouseEnter={disableContentScrollable}
        // onMouseLeave={enableContentScrollable}
      >
        {project.skills.map((skill, index, skills) => {
          const divider = index + 1 === skills.length ? "" : " | ";

          return (
            <label key={skill} className="project-skills-list">
              {skill + divider}
            </label>
          );
        })}
      </motion.div>
      {md || isRightArrowHidden || (
        <div className="absolute inset-y-0 right-0 bg-[#0f0f0f] shadow-[-10px_0_10px] shadow-[#0f0f0f] w-5 flex justify-center items-center">
          <BiChevronRight />
        </div>
      )}
    </div>
  );
};

export default SkillsLabel;
