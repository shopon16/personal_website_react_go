import { Icon, Keywords } from "./icons";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { ProjectCard, MoreCard } from "../components/Cards";

const baseURL = process.env.REACT_APP_PROJECT_API;


function Technologies() {
  const [formFields, setFormFields] = useState([{}]);
  const [formFields1, setFormFields1] = useState([{}]);

  React.useEffect(() => {
      axios.get(baseURL).then((response) => {
          // setPost(response.data)
          setFormFields(response.data.projectCard);
          setFormFields1(response.data.morecard);
      });
  }, []);
  return (
      <section id="projects" className="container">
        <h2 className="head-text">
          FEATURED PROJECTS
          <span className="underline underline-secondary" />
        </h2>
        <div id="project-full">
          {Object.keys(formFields).map((key, index) => {
            return (
              <ProjectCard
                key={key}
                projectName={formFields[index].projectName}
                contents={formFields[index].contents}
                img={formFields[index].img}
                href={formFields[index].href}
                tag1={formFields[index].tag}
                link1={formFields[index].link1}
                link2={formFields[index].link2}
                class={formFields[index].class}
              />
            );
          })}
        </div>

        <h2 className="head-text">
          More Projects
          <span className="underline underline-secondary" />
        </h2>
        <div className="project-container">
          {Object.keys(formFields1).map((key, index) => {
            return (
              <MoreCard
                key={key}
                icon1={
                  <Icon
                    link={formFields1[index].link1}
                    title={formFields1[index].title1}
                    class={formFields1[index].class1}
                  />
                }
                icon2={
                  <Icon
                    link={formFields1[index].link2}
                    title={formFields1[index].title2}
                    class={formFields1[index].class2}
                  />
                }
                title={formFields1[index].title}
                content={formFields1[index].content}
                keywords={<Keywords title={formFields1[index].keyword} />}
              />
            );
          })}
        </div>
      </section>
  );
}
export default Technologies;
