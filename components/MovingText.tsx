import { CSSProperties, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useMediaQuery } from "react-responsive";

const MovingText = () => {
  const md = useMediaQuery({ minWidth: 768 });
  const [customClassName, setCustomClassName] = useState<string>("");
  const [customStyle, setCustomStyle] = useState<CSSProperties>({
    writingMode: "vertical-lr",
  });

  useEffect(() => {
    md ? setCustomClassName("rotate-180 text-right") : setCustomClassName("");
    md
      ? setCustomStyle({ writingMode: "vertical-lr" })
      : setCustomStyle({ writingMode: "horizontal-tb" });
  }, [md]);

  return (
    <h1
      className={`${customClassName} text-xl md:text-2xl md:leading-6 lg:text-3xl xl:text-4xl xl:leading-8`}
      style={customStyle}
    >
      George's Portfolio
    </h1>
  );
};

export default MovingText;
