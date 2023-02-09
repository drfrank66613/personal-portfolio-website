import { useRef, useState, PointerEvent, useEffect } from "react";
import ProjectThumb from "./ProjectThumb";
import { Projects } from "../data/projects";
import { motion, useDragControls } from "framer-motion";

const ProjectsContent = () => {
  const container = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [panX, setPanX] = useState<number>(0);
  const [isMomentumOn, setIsMomentumOn] = useState<boolean>(true);
  const [leftConstraint, setLeftConstraint] = useState<number>(2); // still need to figure out how to get the dynamic value
  const [rightConstraint, setRightConstraint] = useState<number>(0);

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

      if (x > rightConstraint) {
        setRightConstraint(x);
      }

      if (x === leftConstraint) {
        setIsMomentumOn(false);
        return;
      }

      if (x === rightConstraint) {
        setIsMomentumOn(false);
        return;
      }

      setIsMomentumOn(true);
    }
  };

  return (
    <div
      ref={container}
      className="h-full w-full overflow-hidden border-x-2 rounded-lg"
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
        className="flex h-full space-x-2 w-fit text-black"
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
