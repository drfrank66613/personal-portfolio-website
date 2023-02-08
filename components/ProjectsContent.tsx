import { useRef, useState, PointerEvent } from "react";
import ProjectThumb from "./ProjectThumb";
import { Projects } from "../data/projects";
import { motion, useDragControls } from "framer-motion";

const ProjectsContent = () => {
  const container = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [panX, setPanX] = useState<number>(0);

  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType === "mouse") {
      const containerMouseX = e.clientX - container.current?.offsetLeft!;

      const xDecimal = containerMouseX / container.current?.offsetWidth!;

      const maxX =
        content.current?.offsetWidth! - container.current?.offsetWidth!;

      setPanX(maxX * xDecimal * -1);
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
        dragMomentum={false}
        onDrag={(e, info) => {
          console.log(e);
          // let target = e.target as HTMLImageElement
          // if(target.x )
        }}
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
