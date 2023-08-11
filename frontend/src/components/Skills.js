//import userdata from "../contents/userdata.json"
import axios from "axios";
import React from "react";

const baseURL = process.env.REACT_APP_SKILL_API;
export function SkillCards(props){
  return (
    <div className="card">
    <span className={props.iconclass} />
    <h3>{props.heading}</h3>
    <p>
      {props.paragraph}
    </p>
  </div>
  );
}

export function Skills() {
  const [post, setPost] = React.useState(null);
  React.useEffect(() => {
      axios.get(baseURL).then((response) => {
          setPost(response.data);
      });
  }, []);
  if (post === null) return;
  
  //console.log(post.skills[0].heading)
    return(
        <>
        {/* Skills Section */}
        <section id="skills">
            <div id="skills" className="container">
              <div className="skills">
                <div className="box-header">
                  <h3 className="text-primary head-text">
                    Benefits<span className="underline underline-primary" />
                  </h3>
                  <h3>Why should you hire me?</h3>
                  <p>{post.reasontohire}</p>
                </div>
                <div className="box-container">
                {
                  post.skills.map((value,key)=>{
                    return(
                      <SkillCards key={key}
                      heading={value.heading}
                      paragraph={value.paragraph}
                      iconclass={value.iconclass}
                      />
                    );
                  })
                }               
                </div>
              </div>
            </div>
          </section>
      </>
    );
}
