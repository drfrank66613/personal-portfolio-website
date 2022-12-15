import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/gk-logo.png"
      alt="George Kennedy's Logo"
      width={300}
      height={300}
    />
  );
};

export default Logo;
