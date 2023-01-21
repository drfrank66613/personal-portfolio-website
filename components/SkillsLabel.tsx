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

type SkillsLabelProps = {
  project: Project;
  scrollableContent: RefObject<HTMLDivElement>;
};

const SkillsLabel = ({ project, scrollableContent }: SkillsLabelProps) => {
  const scrollableLabel = useRef<HTMLDivElement>(null);
  const [isLeftArrowHidden, setIsLeftArrowHidden] = useState<boolean>(true);
  const [isRightArrowHidden, setIsRightArrowHidden] = useState<boolean>(true);

  const md = useMediaQuery({ minWidth: 768 });

  const preventDefault = useMemo(() => (e: any) => e.preventDefault(), []);

  const disableContentScrollable = () => {
    scrollableContent.current?.addEventListener("wheel", preventDefault, {
      passive: false,
    });
  };

  const enableContentScrollable = () => {
    scrollableContent.current?.removeEventListener(
      "wheel",
      preventDefault,
      false
    );
  };

  const onLabelWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (scrollableLabel.current) {
      scrollableLabel.current.scrollLeft += e.deltaY;

      const offsetLeft = scrollableLabel.current.offsetLeft;
      const offsetWidth = scrollableLabel.current.offsetWidth;
      const scrollWidth = scrollableLabel.current.scrollWidth;
      const scrollLeft = scrollableLabel.current.scrollLeft;

      if (offsetLeft == scrollLeft) {
        setIsLeftArrowHidden(true);
      } else {
        setIsLeftArrowHidden(false);
        setIsRightArrowHidden(false);
      }

      if (offsetWidth + scrollLeft + 1 >= scrollWidth) {
        setIsRightArrowHidden(true);
        console.log("hidden");
      } else {
        console.log("display");
        setIsRightArrowHidden(false);
      }
    }
  };

  // FIX arrow on resize

  useEffect(() => {
    if (
      scrollableLabel.current?.offsetWidth !=
      scrollableLabel.current?.scrollWidth
    ) {
      setIsRightArrowHidden(false);
    } else {
      setIsRightArrowHidden(true);
    }
    console.log(scrollableLabel);
  }, [scrollableLabel.current?.offsetWidth]);

  return (
    <div className="relative">
      {md || isLeftArrowHidden || (
        <div className="absolute inset-y-0 left-0 bg-[#0f0f0f] w-5 flex justify-center items-center">
          <BiChevronLeft />
        </div>
      )}
      <div
        className="whitespace-nowrap md:w-full md:whitespace-normal overflow-x-hidden"
        ref={scrollableLabel}
        onWheel={onLabelWheel}
        onMouseEnter={disableContentScrollable}
        onMouseLeave={enableContentScrollable}
      >
        {project.skills.map((skill, index, skills) => {
          const divider = index + 1 === skills.length ? "" : " | ";

          return (
            <label
              key={skill}
              className="skills-list text-xs lg:text-sm text-neutral-400"
            >
              {skill + divider}
            </label>
          );
        })}
      </div>
      {md || isRightArrowHidden || (
        <div className="absolute inset-y-0 right-0 bg-[#0f0f0f] w-5 flex justify-center items-center">
          <BiChevronRight />
        </div>
      )}
    </div>
  );
};

export default SkillsLabel;
