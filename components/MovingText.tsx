import Marquee from "react-fast-marquee";

const MovingText = () => {
  return (
    <h1
      className="rotate-180 text-right text-3xl md:text-2xl md:leading-6 lg:text-3xl xl:text-4xl xl:leading-8"
      style={{ writingMode: "vertical-lr" }}
    >
      George's Portfolio
    </h1>
  );
};

export default MovingText;
