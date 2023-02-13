import {
  ReactElement,
  useEffect,
  useRef,
  useState,
  WheelEvent,
  MouseEvent,
} from "react";
import { NextPageWithLayout } from "../_app";
import { BiLeftArrow, BiRightArrow, BiCodeAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { TfiWorld } from "react-icons/tfi";
import { TbWorld } from "react-icons/tb";

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
  const lg = useMediaQuery({ minWidth: 1024 });
  const xl2 = useMediaQuery({ minWidth: 2560 });

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
        <div className="h-screen px-11 2xl:px-20 py-7 2xl:py-12 flex flex-col">
          <header>
            <Link
              href="/"
              className="flex items-center space-x-2 2xl:space-x-3 cursor-pointer"
            >
              <RiHome2Line size={xl2 ? 40 : 20} />
              <h2 className="pt-[2px] 2xl:pt-[2px]">Back To Main</h2>
            </Link>
          </header>

          <main className="h-[90%] md:flex items-center md:space-x-10 2xl:space-x-16">
            <section className="h-[60%] sm:h-[50%] md:h-full md:w-[60%] flex items-center">
              <div className="max-h-[75%] h-fit w-full flex flex-col space-y-2">
                <div className="pr-3 md:pr-4 2xl:pr-8">
                  <h1>{currentProject.name}</h1>
                  <SkillsLabel
                    project={currentProject}
                    scrollableContent={scrollableContent}
                  />
                </div>
                <div className="content-border overflow-y-auto pr-3 md:pr-4 2xl:pr-8">
                  {currentProject.content.initial}
                  {isContentExpanded ? currentProject.content.full : null}
                </div>
                <div className="flex justify-between items-center">
                  <button onClick={toggleExpanded} className="more-less-text">
                    {isContentExpanded ? "Show less" : "...Read more"}
                  </button>
                  <div>
                    {currentProject.link?.code && (
                      <div className="flex items-center space-x-2 project-link">
                        <BiCodeAlt size={lg ? 25 : 15} />
                        <Link href={currentProject.link.code} target="_blank">
                          View Code
                        </Link>
                      </div>
                    )}
                    {currentProject.link?.site && (
                      <div className="flex items-center space-x-2 2xl:space-x-3 project-link">
                        <TbWorld
                          strokeWidth={1}
                          size={xl2 ? 50 : lg ? 25 : 20}
                        />
                        <Link href={currentProject.link.site} target="_blank">
                          View Site
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* <div
                className="content-border max-h-[75%] overflow-y-auto overflow-x-hidden pr-3 2xl:pr-6"
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
                <div>View Link</div>
              </div> */}
            </section>
            <section className="md:w-[40%] h-[40%] sm:h-[50%] md:h-full md:py-32 lg:py-20">
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
                className="flex items-center space-x-2 2xl:space-x-3 cursor-pointer"
              >
                <BiLeftArrow size={xl2 ? 40 : 20} />
                {sm ? (
                  <h2 className="pt-[1px]">{prevProject.name}</h2>
                ) : (
                  <h2 className="pt-[1px]">Prev</h2>
                )}
              </Link>
            ) : (
              <div></div>
            )}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.id}`}
                className="flex items-center space-x-2 2xl:space-x-3 cursor-pointer"
              >
                {sm ? (
                  <h2 className="pt-[1px]">{nextProject.name}</h2>
                ) : (
                  <h2 className="pt-[1px]">Next</h2>
                )}
                <BiRightArrow size={xl2 ? 40 : 20} />
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
