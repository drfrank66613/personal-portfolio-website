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
import SkillsLabel from "../../components/SkillsLabel";

const ProjectDetails: NextPageWithLayout = () => {
  const router = useRouter();
  const [isContentExpanded, setIsContentExpanded] = useState<boolean>(false);
  const [viewedImage, setViewedImage] = useState<ImageGallery | null>(null);
  const [isFullImageOpen, setIsFullImageOpen] = useState<boolean>(false);
  const scrollableContent = useRef<HTMLDivElement>(null);
  const sm = useMediaQuery({ minWidth: 640 });

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
            <section className="md:w-[60%] sm:h-[50%] md:h-full h-[60%] flex items-center">
              <div
                className="content-border max-h-[75%] overflow-y-auto overflow-x-hidden pr-3"
                ref={scrollableContent}
              >
                <h1>{currentProject.name}</h1>
                <SkillsLabel
                  project={currentProject}
                  scrollableContent={scrollableContent}
                />
                <div className="mt-3">
                  {currentProject.content.initial}
                  {isContentExpanded ? currentProject.content.full : null}
                  <button onClick={toggleExpanded} className="more-less-text">
                    {isContentExpanded ? "Show less" : "...Read more"}
                  </button>
                </div>
              </div>
            </section>
            <section className="md:w-[40%] sm:h-[50%] md:h-full h-[40%] md:py-32 lg:py-20">
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
                {sm ? <h2>{prevProject.name}</h2> : <h2>Prev</h2>}
              </Link>
            ) : (
              <div></div>
            )}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.id}`}
                className="flex items-center space-x-2 cursor-pointer"
              >
                {sm ? <h2>{nextProject.name}</h2> : <h2>Next</h2>}
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
