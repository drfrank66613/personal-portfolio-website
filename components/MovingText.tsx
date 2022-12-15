import Marquee from "react-fast-marquee";

const MovingText = () => {
  return (
    <h1
      className="rotate-180 text-right my-10"
      style={{ writingMode: "vertical-lr" }}
    >
      George's Portfolio
    </h1>
  );
};

export default MovingText;
