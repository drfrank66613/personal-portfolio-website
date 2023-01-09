import { ReactElement, useEffect, useState } from "react";
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

const ProjectDetails: NextPageWithLayout = () => {
  const router = useRouter();
  const [isContentExpanded, setIsContentExpanded] = useState<boolean>(false);
  const [viewedImage, setViewedImage] = useState<ImageGallery | null>(null);
  const [isFullImageOpen, setIsFullImageOpen] = useState<boolean>(false);

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

          <main className="h-[90%] flex space-x-10">
            <section className="w-[60%] flex items-center">
              <div className="content-border max-h-[75%] overflow-auto pr-3">
                <h1>{currentProject.name}</h1>
                <div>
                  {currentProject.skills.map((skill, index, skills) => {
                    const divider = index + 1 === skills.length ? "" : " | ";

                    return (
                      <label
                        key={skill}
                        className="skills-list text-sm text-neutral-400"
                      >
                        {skill + divider}
                      </label>
                    );
                  })}
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
            <section className="w-[40%] py-20">
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
