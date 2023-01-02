import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { RiHome2Line } from "react-icons/ri";
import { Projects } from "../../data/projects";
import { useRouter } from "next/router";
import Image from "next/image";
import GalleryThumb from "../../components/GalleryThumb";

type Gallery = {
  src: string;
  alt: string;
};

const ProjectDetails: NextPageWithLayout = () => {
  const router = useRouter();
  const [isContentExpanded, setIsContentExpanded] = useState<boolean>(false);
  const [viewedImage, setViewedImage] = useState<Gallery | null>(null);
  const [isFullImage, setIsFullImage] = useState<boolean>(false);

  const currentProject = Projects.find(
    (project) => project.id === router.query.projectId
  );

  const nextProjectIdx =
    Projects.findIndex((project) => project.id === router.query.projectId) + 1;
  const nextProject = Projects.find((_, index) => nextProjectIdx === index);

  const prevProjectIdx =
    Projects.findIndex((project) => project.id === router.query.projectId) - 1;
  const prevProject = Projects.find((_, index) => prevProjectIdx === index);

  const toOtherProject = (id: string) => {
    router.push(`/projects/${id}`);
  };

  const backToMain = () => {
    router.push("/");
  };

  const toggleExpanded = () => {
    setIsContentExpanded((prev) => !prev);
  };

  const viewImage = (image: Gallery) => {
    setViewedImage(image);
    setIsFullImage(true);
  };

  const closeImage = () => {
    setIsFullImage(false);
  };

  useEffect(() => {
    setIsContentExpanded(false);
  }, [router.query.projectId]);

  return (
    <>
      {currentProject && (
        <div className="h-screen px-11 py-7 flex flex-col">
          <header>
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={backToMain}
            >
              <RiHome2Line size={20} />
              <h2>Back To Main</h2>
            </div>
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
                  <span onClick={toggleExpanded} className="more-less-text">
                    {isContentExpanded ? "Show less" : "...Read more"}
                  </span>
                </div>
              </div>
            </section>
            <section className="w-[40%] py-20">
              <div className="grid grid-cols-2 grid-rows-3 gap-1 h-full">
                {currentProject.gallery.map((gallery, index) => (
                  <GalleryThumb
                    index={index}
                    gallery={gallery}
                    viewImage={viewImage}
                  />
                ))}
                {viewedImage && isFullImage && (
                  <div className="inset-0 fixed h-screen w-screen z-10 bg-black bg-opacity-90 flex justify-center items-center">
                    <div className="relative w-[90%] h-full">
                      <Image
                        src={viewedImage.src}
                        alt={viewedImage.alt}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div
                      onClick={closeImage}
                      className="absolute top-[3%] right-[1.5%] cursor-pointer"
                    >
                      <AiOutlineClose size={20} />
                    </div>
                  </div>
                )}
              </div>
            </section>
          </main>
          <footer className="flex justify-between">
            {prevProject ? (
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => toOtherProject(prevProject.id)}
              >
                <BiLeftArrow size={20} />
                <h2>{prevProject.name}</h2>
              </div>
            ) : (
              <div></div>
            )}

            {nextProject ? (
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => toOtherProject(nextProject.id)}
              >
                <h2>{nextProject.name}</h2>
                <BiRightArrow size={20} />
              </div>
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
