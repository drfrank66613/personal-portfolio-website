import Marquee from "react-fast-marquee";

const MovingText = () => {
  return (
    <h3
      className="rotate-180 text-right"
      style={{ writingMode: "vertical-lr" }}
    >
      George's Portfolio
    </h3>
  );
};

export default MovingText;
