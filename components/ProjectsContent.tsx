import { useRef, useState, PointerEvent, useEffect } from "react";
import ProjectThumb from "./ProjectThumb";
import { Projects } from "../data/projects";
import { motion, useDragControls } from "framer-motion";

const ProjectsContent = () => {
  const container = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [panX, setPanX] = useState<number>(0);
  const [isMomentumOn, setIsMomentumOn] = useState<boolean>(true);
  const [constraint, setConstraint] = useState<number>(0);

  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType === "mouse") {
      const containerMouseX = e.clientX - container.current?.offsetLeft!;

      const xDecimal = containerMouseX / container.current?.offsetWidth!;

      const maxX =
        content.current?.offsetWidth! - container.current?.offsetWidth!;

      setPanX(maxX * xDecimal * -1);
    }
  };

  const toggleMomentum = (e: PointerEvent) => {
    if (e.pointerType === "touch") {
      const x = Number(
        content.current?.style.transform
          .split(" ")[0]
          .replace(/[^0-9\.]+/g, "")!
      );

      setConstraint(x);

      if (x === constraint) {
        setIsMomentumOn(false);
        return;
      }

      setIsMomentumOn(true);
    }
  };

  return (
    <div
      ref={container}
      className="h-full w-full overflow-hidden border-x-2 2xl:border-x-4 rounded-lg 2xl:rounded-xl"
      onPointerMove={onPointerMove}
    >
      <motion.div
        drag="x"
        dragConstraints={container}
        dragElastic={0}
        dragMomentum={isMomentumOn}
        onPointerMove={toggleMomentum}
        dragTransition={{ timeConstant: 200, power: 0.2 }}
        animate={{ x: panX }}
        transition={{ ease: "easeOut", duration: 0.5 }}
        className="flex h-full space-x-2 2xl:space-x-4 w-fit text-black"
        ref={content}
      >
        {Projects.map(({ id, name }, index) => (
          <ProjectThumb key={index} src={`/${id}.png`} alt={name} id={id} />
        ))}
      </motion.div>
    </div>
  );
};

export default ProjectsContent;
