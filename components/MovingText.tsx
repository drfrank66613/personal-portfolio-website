import Marquee from "react-fast-marquee";

const MovingText = () => {
  return (
    <h1
      className="rotate-180 text-right text-3xl"
      style={{ writingMode: "vertical-lr" }}
    >
      George's Portfolio
    </h1>
  );
};

export default MovingText;
