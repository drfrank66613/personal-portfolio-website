import {
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
  WheelEvent,
  PointerEvent,
} from "react";
import type { Project } from "../data/projects";
import { useMediaQuery } from "react-responsive";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

type SkillsLabelProps = {
  project: Project;
  scrollableContent: RefObject<HTMLDivElement>;
};

const SkillsLabel = ({ project, scrollableContent }: SkillsLabelProps) => {
  const router = useRouter();
  const container = useRef<HTMLDivElement>(null);
  const scrollableLabel = useRef<HTMLDivElement>(null);
  const [isLeftArrowOpen, setIsLeftArrowOpen] = useState<boolean>(false);
  const [isRightArrowOpen, setIsRightArrowOpen] = useState<boolean>(false);
  const md = useMediaQuery({ minWidth: 768 });

  const scroll = (e: PointerEvent) => {
    if (e.pointerType === "touch") {
      if (container.current) {
        container.current.scrollLeft -= e.movementX;

        const containerScrollWidth = container.current.scrollWidth;
        const containerOffsetWidth = container.current.offsetWidth;
        const roundContainerScrollLeft = Number(
          container.current.scrollLeft.toFixed()
        );

        if (roundContainerScrollLeft === 0) {
          setIsLeftArrowOpen(false);
        } else {
          setIsLeftArrowOpen(true);
        }

        if (
          roundContainerScrollLeft + 1 >=
          containerScrollWidth - containerOffsetWidth
        ) {
          setIsRightArrowOpen(false);
        } else {
          setIsRightArrowOpen(true);
        }
      }
    }
  };

  useEffect(() => {
    const containerScrollWidth = container.current?.scrollWidth;
    const containerOffsetWidth = container.current?.offsetWidth;

    container.current?.scrollTo(0, 0);
    setIsLeftArrowOpen(false);

    if (containerScrollWidth !== containerOffsetWidth) {
      setIsRightArrowOpen(true);
    } else {
      setIsRightArrowOpen(false);
    }
  }, [router.query.projectId, container.current?.offsetWidth]);

  // Re-render on browser resize
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", setWindowDimensions);
    return () => {
      window.removeEventListener("resize", setWindowDimensions);
    };
  }, []);

  return (
    <div className="relative">
      {md ||
        (isLeftArrowOpen && (
          <div className="absolute inset-y-0 left-0 bg-[#0f0f0f] shadow-[10px_0_10px] shadow-[#0f0f0f] w-5 flex justify-center items-center">
            <BiChevronLeft />
          </div>
        ))}
      <div
        className="w-full overflow-x-hidden touch-none"
        ref={container}
        onPointerMove={scroll}
      >
        <motion.div
          className="whitespace-nowrap w-fit md:w-full md:whitespace-normal"
          ref={scrollableLabel}
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
      </div>
      {md ||
        (isRightArrowOpen && (
          <div className="absolute inset-y-0 right-0 bg-[#0f0f0f] shadow-[-10px_0_10px] shadow-[#0f0f0f] w-5 flex justify-center items-center">
            <BiChevronRight />
          </div>
        ))}
    </div>
  );
};

export default SkillsLabel;
