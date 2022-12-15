import Logo from "../components/Logo";
import MovingText from "../components/MovingText";
import Marquee from "react-fast-marquee";
import Head from "next/head";
import Link from "next/link";
import AboutContent from "../components/AboutContent";
import { useRouter } from "next/router";

const index = () => {
  return (
    <>
      <Head>
        <title>George Kennedy's Portfolio</title>
        <meta
          name="description"
          content="A portfolio website of George Kennedy that showcases his projects & skills as well as tells a bit about him as a software engineer"
        />
      </Head>
      <AboutContent />
    </>
  );
};

export default index;
