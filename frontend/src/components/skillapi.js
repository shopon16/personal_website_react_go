import { useState } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_SKILL_API;
export function SkillCards(props) {
  return (
    <div className="card">
      <p>{props.iconclass}</p>
      <h3>{props.heading}</h3>
      <p>{props.paragraph}</p>
    </div>
  );
}

export default function Skills() {
  const [reason, setReason] = useState([""]);
  const [formFields, setFormFields] = useState([{}]);
  const [sub, setSub] = useState("");

  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
      setReason(response.data.reasontohire);
      setFormFields(response.data.skills);
    });
  }, []);
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/skills`;
    navigate(path);
  };
  if (post === null) return;
  const handleFormChange = (jsonkey, event, index) => {
    const testdata = [...formFields];
    testdata[index][jsonkey] = event.target.value;
    console.log(testdata);
    setFormFields([...testdata]);
  };
  const handleReason = (event, index) => {
    setReason(event.target.value);
  };
  function addskill() {
    const testdata = [...formFields, {}];
    setFormFields([...testdata]);
  }
  function removeskill(index) {
    const testdata = [...formFields];
    testdata.splice(index, 1);
    console.log(index);
    setFormFields([...testdata]);
  }
  const submit = (e) => {
    e.preventDefault();

    fetch(baseURL, {
      method: "POST",
      body: JSON.stringify({
        reasontohire: reason,
        skills: [...formFields],
      }),
    });
    setSub("submitted");
  };

  //console.log(post.skills[0].heading)
  return (
    <>
      {/* Skills Section */}
      <section id="skills">
        <form method="post" onSubmit={(e) => { submit(e); routeChange();}}  className="form">
          <div id="skills" className="container">
            <div className="skills">
              <div className="box-header">
                <h3 className="text-primary head-text">
                  Benefits
                  <span className="underline underline-primary" />
                </h3>
                <h3>Why should you hire me?</h3>
                <p>
                  <input
                    defaultValue={reason}
                    onChange={handleReason}
                    type="text"
                    name="myname"
                    id="Name"
                    placeholder="Enter Reason"
                  />
                </p>
              </div>
              <div className="box-container">
                {Object.keys(formFields).map((key, index) => {
                  return (
                    <div className="card">
                      <h1>Skill {key}</h1>
                      <p>
                        <div className="form-group group-bg">
                          <input
                            defaultValue={formFields[index].iconclass}
                            onChange={(e) =>
                              handleFormChange("iconclass", e, index)
                            }
                          />
                        </div>
                      </p>
                      <h3>
                        <div className="form-group group-bg">
                          <input
                            defaultValue={formFields[index].heading}
                            onChange={(e) =>
                              handleFormChange("heading", e, index)
                            }
                          />
                        </div>
                      </h3>
                      <p>
                        <div className="form-group group-bg">
                          <input
                            defaultValue={formFields[index].paragraph}
                            onChange={(e) =>
                              handleFormChange("paragraph", e, index)
                            }
                          />
                        </div>
                      </p>
                      <button
                        className="btn"
                        onClick={() => removeskill(index)}
                      >
                        remove skill
                      </button>
                    </div>

                    //   <SkillCards key={key}
                    //   heading={value.heading}
                    //   paragraph={value.paragraph}
                    //   iconclass={value.iconclass}
                    //   />
                  );
                })}
              </div>
            </div>
          </div>
          <button className="btn" type="submit" value="submit">
            Submit
          </button>

          <p>Your from is : {sub}</p>
          <button className="btn" onClick={addskill}>
            add skill
          </button>
        </form>
      </section>
    </>
  );
}
