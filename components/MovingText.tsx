import Marquee from "react-fast-marquee";
import { useMediaQuery } from "react-responsive";

const MovingText = () => {
  const md = useMediaQuery({ minWidth: 768 });
  const customStyle = md ? "rotate-180 text-right" : "";

  return (
    <h1
      className={`${customStyle} text-xl md:text-2xl md:leading-6 lg:text-3xl xl:text-4xl xl:leading-8`}
      style={
        md ? { writingMode: "vertical-lr" } : { writingMode: "horizontal-tb" }
      }
    >
      George's Portfolio
    </h1>
  );
};

export default MovingText;
