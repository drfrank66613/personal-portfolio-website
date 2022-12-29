import type { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { RiHome2Line } from "react-icons/ri";
import { Projects } from "../../data/projects";
import { useRouter } from "next/router";

const ProjectDetails: NextPageWithLayout = () => {
  const router = useRouter();
  const currentProject = Projects.find(
    (project) => project.id === router.query.id
  );

  const nextProjectIdx =
    Projects.findIndex((project) => project.id === router.query.id) + 1;
  const nextProject = Projects.find((_, index) => nextProjectIdx === index);

  const prevProjectIdx =
    Projects.findIndex((project) => project.id === router.query.id) - 1;
  const prevProject = Projects.find((_, index) => prevProjectIdx === index);

  return (
    <>
      {currentProject && (
        <div className="h-screen px-11 py-7 flex flex-col">
          <header>
            <div className="flex items-center space-x-2">
              <RiHome2Line size={20} />
              <h2>Back To Main</h2>
            </div>
          </header>
          <div className="h-full flex items-center">
            <main className="w-full flex">
              <section className="w-[60%]">
                <h1>{currentProject.name}</h1>
                <div>
                  {currentProject.skills.map((skill, index, skills) => {
                    const divider = index + 1 === skills.length ? "" : " | ";

                    return (
                      <label key={skill} className="skills-list text-base">
                        {skill + divider}
                      </label>
                    );
                  })}
                </div>
                <p className="mt-3">{currentProject.content}</p>
              </section>
              <section className="w-[40%]">
                <h1>Gallery</h1>
              </section>
            </main>
          </div>
          <footer className="flex justify-between">
            {prevProject ? (
              <div className="flex items-center space-x-2">
                <BiLeftArrow size={20} />
                <h2>{prevProject.name}</h2>
              </div>
            ) : (
              <div></div>
            )}

            {nextProject ? (
              <div className="flex items-center space-x-2">
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
