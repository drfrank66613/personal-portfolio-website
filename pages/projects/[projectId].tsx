import {
  ReactElement,
  useEffect,
  useRef,
  useState,
  WheelEvent,
  MouseEvent,
} from "react";
import { NextPageWithLayout } from "../_app";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { RiHome2Line } from "react-icons/ri";
import { Projects } from "../../data/projects";
import { useRouter } from "next/router";
import Image from "next/image";
import GalleryThumb from "../../components/GalleryThumb";
import FullImageGallery from "../../components/FullImageGallery";
import type { ImageGallery } from "../../data/projects";
import GalleryLayout from "../../components/GalleryLayout";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

const ProjectDetails: NextPageWithLayout = () => {
  const router = useRouter();
  const [isContentExpanded, setIsContentExpanded] = useState<boolean>(false);
  const [viewedImage, setViewedImage] = useState<ImageGallery | null>(null);
  const [isFullImageOpen, setIsFullImageOpen] = useState<boolean>(false);
  const scrollableContent = useRef<HTMLDivElement>(null);
  const scrollableLabel = useRef<HTMLDivElement>(null);
  const md = useMediaQuery({ minWidth: 768 });

  const currentProject = Projects.find(
    (project) => project.id === router.query.projectId
  );

  const nextProjectIdx =
    Projects.findIndex((project) => project.id === router.query.projectId) + 1;
  const nextProject = Projects.find((_, index) => nextProjectIdx === index);

  const prevProjectIdx =
    Projects.findIndex((project) => project.id === router.query.projectId) - 1;
  const prevProject = Projects.find((_, index) => prevProjectIdx === index);

  const toggleExpanded = () => {
    setIsContentExpanded((prev) => !prev);
  };

  const viewImage = (image: ImageGallery) => {
    setViewedImage(image);
    setIsFullImageOpen(true);
  };

  const closeImage = () => {
    setViewedImage(null);
    setIsFullImageOpen(false);
  };

  useEffect(() => {
    setIsContentExpanded(false);
  }, [router.query.projectId]);

  const preventDefault = (e: any) => e.preventDefault();

  const disableContentScrollable = () => {
    scrollableContent.current?.addEventListener("wheel", preventDefault, {
      passive: false,
    });
  };

  const enableContentScrollable = () => {
    scrollableContent.current?.removeEventListener(
      "wheel",
      preventDefault,
      false
    );
  };

  const onLabelWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (scrollableLabel.current) {
      scrollableLabel.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <>
      {currentProject && (
        <div className="h-screen px-11 py-7 flex flex-col">
          <header>
            <Link
              href="/"
              className="flex items-center space-x-2 cursor-pointer"
            >
              <RiHome2Line size={20} />
              <h2>Back To Main</h2>
            </Link>
          </header>

          <main className="h-[90%] md:flex md:space-x-10">
            <section className="md:w-[60%] md:h-full h-[50%] flex items-center">
              <div
                className="content-border max-h-[75%] overflow-y-auto overflow-x-hidden pr-3"
                ref={scrollableContent}
              >
                <h1>{currentProject.name}</h1>
                <div className="relative">
                  <div
                    className="whitespace-nowrap md:w-full md:whitespace-normal overflow-x-hidden"
                    ref={scrollableLabel}
                    onWheel={onLabelWheel}
                    onMouseEnter={disableContentScrollable}
                    onMouseLeave={enableContentScrollable}
                  >
                    {currentProject.skills.map((skill, index, skills) => {
                      const divider = index + 1 === skills.length ? "" : " | ";

                      return (
                        <label
                          key={skill}
                          className="skills-list text-xs lg:text-sm text-neutral-400"
                        >
                          {skill + divider}
                        </label>
                      );
                    })}
                  </div>
                  {md || (
                    <div className="absolute inset-y-0 right-0 bg-black w-5 flex justify-center items-center">
                      <div>r</div>
                    </div>
                  )}
                </div>
                <div className="mt-3">
                  {currentProject.content.initial}
                  {isContentExpanded ? currentProject.content.full : null}
                  <button onClick={toggleExpanded} className="more-less-text">
                    {isContentExpanded ? "Show less" : "...Read more"}
                  </button>
                </div>
              </div>
            </section>
            <section className="md:w-[40%] md:h-full h-[50%] md:py-20">
              <GalleryLayout
                gallery={currentProject.gallery}
                viewImage={viewImage}
              />

              <FullImageGallery
                isOpen={isFullImageOpen}
                gallery={currentProject.gallery}
                viewedImage={viewedImage}
                closeImage={closeImage}
              />
            </section>
          </main>
          <footer className="flex justify-between">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.id}`}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <BiLeftArrow size={20} />
                <h2>{prevProject.name}</h2>
              </Link>
            ) : (
              <div></div>
            )}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.id}`}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <h2>{nextProject.name}</h2>
                <BiRightArrow size={20} />
              </Link>
            ) : (
              <div></div>
            )}
          </footer>
        </div>
      )}
    </>
  );
};

export default ProjectDetails;

ProjectDetails.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
