import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_PROJECT_API;
function Technologies() {
  //const [post, setPost] = React.useState(null);
  const [formFields, setFormFields] = useState([{}]);
  const [formFields1, setFormFields1] = useState([{}]);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      // setPost(response.data)
      setFormFields(response.data.projectCard);
      setFormFields1(response.data.morecard);
    });
  }, []);

  const handleFormChange = (jsonkey, event, index) => {
    const testdata = [...formFields];
    testdata[index][jsonkey] = event.target.value;
    console.log(testdata);
    setFormFields([...testdata]);
  };
  const handleFormChange1 = (jsonkey, event, index) => {
    const testdata1 = [...formFields1];
    testdata1[index][jsonkey] = event.target.value;
    console.log(testdata1);
    setFormFields1([...testdata1]);
  };

  const addFields = () => {
    const testdata = [...formFields, {}];
    setFormFields([...testdata]);
  };
  const addFields1 = () => {
    const testdata1 = [...formFields1, {}];
    setFormFields1([...testdata1]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1); //remove 1 element from index
    setFormFields(data);
  };
  const removeFields1 = (index) => {
    let data1 = [...formFields1];
    data1.splice(index, 1); //remove 1 element from index
    setFormFields1(data1);
  };
  const submit = (e) => {
    e.preventDefault();

    fetch(baseURL, {
      method: "POST",
      body: JSON.stringify({
        projectCard: [...formFields],
        morecard: [...formFields1],
      }),
    });
  };
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/projects`;
    navigate(path);
  };

  return (
    <section id="projects" className="container">
      <form method="post" onSubmit={(e) => { submit(e); routeChange();}} className="form">
        <h2 className="head-text">
          FEATURED PROJECTS
          <span className="underline underline-secondary" />
        </h2>
        <div id="project-full">
          {Object.keys(formFields).map((key, index) => {
            return (
                <>
              <article className="project-content">
                <input
                  onChange={(e) => handleFormChange("img", e, index)}
                  name="img"
                  defaultValue={formFields[index].img}
                  required
                />
                <h3>image path</h3>
                <input
                  onChange={(e) => handleFormChange("href", e, index)}
                  name="href"
                  defaultValue={formFields[index].href}
                  required
                />
                <h3>link of the project</h3>
                <div className="project-image project-image-one">
                  <img
                    src={`${process.env.PUBLIC_URL}${formFields[index].img}`}
                    alt="Hashnode Clone"
                  />
                  <a className="btn btn-one" href={formFields[index].href}>
                    Preview Link
                  </a>
                </div>
                <div className="card-content">
                  <h2>
                    <input
                      onChange={(e) =>
                        handleFormChange("projectName", e, index)
                      }
                      name="projectName"
                      defaultValue={formFields[index].projectName}
                    />
                  </h2>
                  <p>
                    <textarea
                      onChange={(e) => handleFormChange("contents", e, index)}
                      name="contents"
                      defaultValue={formFields[index].contents}
                    />
                  </p>
                  <div className="project-info">
                    <div className="stack">
                      <small className="language">
                        {" "}
                        <input
                          onChange={(e) => handleFormChange("tag", e, index)}
                          name="tag"
                          defaultValue={formFields[index].tag}
                        />
                      </small>
                    </div>
                    <div className="project-links">
                      <h3>source code link</h3>
                      <input
                        onChange={(e) => handleFormChange("link1", e, index)}
                        name="link1"
                        defaultValue={formFields[index].link1}
                      />
                      <a href={formFields[index].link1}>
                        <i className="fab fa-github" />
                      </a>
                      
                      <h3>link of the project</h3>
                      <input
                        onChange={(e) => handleFormChange("link2", e, index)}
                        name="link2"
                        defaultValue={formFields[index].link2}
                      />

                      <a href={formFields[index].link2}>
                        <i className="fas fa-external-link-alt" />
                      </a>
                      
                    </div>
                  </div>
                </div>
              </article>
              <button className="btn" onClick={() => removeFields(index)}>remove skill</button>

              </>
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
                <>
                <div className="card">
                  <div className="icon-header">
                    {/* ////icon1 */}
                    <h3>link of the project</h3>
                    <input
                      name="moreLink1"
                      onChange={(e) => handleFormChange1("moreLink1", e, index)}
                      defaultValue={formFields1[index].moreLink2}
                      required
                    />
                    <h3>title of link when it hover</h3>
                    <input
                      onChange={(e) => handleFormChange1("title1", e, index)}
                      name="title1"
                      defaultValue={formFields1[index].title1}
                      required
                    />
                    <h3>class for logo</h3>
                    <input
                      name="class1"
                      onChange={(e) => handleFormChange1("class1", e, index)}
                      defaultValue={formFields1[index].class1}
                      required
                    />
 <a href={formFields1[index].moreLink1} title={formFields1[index].title1}  className={formFields1[index].class1}>{formFields1[index].anchor_text}</a>
                    
                    {/* ////icon1 */}
                    {/* ////icon2 */}
                    <h3>link of the project</h3>
                    <input
                      name="moreLink2"
                      onChange={(e) => handleFormChange1("moreLink2", e, index)}
                      defaultValue={formFields1[index].moreLink2}
                      required
                    />
                    <h3>title of link when it hover</h3>
                    <input
                      onChange={(e) => handleFormChange1("title2", e, index)}
                      name="title2"
                      defaultValue={formFields1[index].title2}
                      required
                    />
                    <h3>class for logo</h3>
                    <input
                      name="class2"
                      onChange={(e) => handleFormChange1("class2", e, index)}
                      defaultValue={formFields1[index].class2}
                      required
                    />
 <a href={formFields1[index].moreLink2} title={formFields1[index].title2}  className={formFields1[index].class2}>{formFields1[index].anchor_text}</a>

                    
                    {/* ////icon2 */}
                  </div>
                  <header>
                    <h3>
                      <input
                        name="title"
                        onChange={(e) => handleFormChange1("title", e, index)}
                        defaultValue={formFields1[index].title}
                        required
                      />
                    </h3>
                    <p>
                      <textarea
                        name="content"
                        onChange={(e) => handleFormChange1("content", e, index)}
                        defaultValue={formFields1[index].content}
                        required
                      />
                    </p>
                  </header>
                  <ul>
                    <li className="language">
                      <input
                        name="keyword"
                        onChange={(e) => handleFormChange1("keyword", e, index)}
                        defaultValue={formFields1[index].keyword}
                        required
                      />
                    </li>
                  </ul>
                  <button className="btn" onClick={() => removeFields1(index)}>remove skill</button>
                </div>
                

              </>
            );
          })}
        </div>
        <button className="btn" type="submit" value="submit">
          Submit
        </button>
        <button className="btn" onClick={addFields}>
          Add feature project
        </button>
        <button className="btn" onClick={addFields1}>
          Add more project
        </button>
      </form>
    </section>
  );
}
export default Technologies;
