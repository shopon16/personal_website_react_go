import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_CONTACT_API;
function ContactAPI() {
  //const [post, setPost] = React.useState(null);
  const [formFields, setFormFields] = useState([{}]);
  const [formFields1, setFormFields1] = useState([{}]);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      // setPost(response.data)
      setFormFields(response.data.clientinfo);
      setFormFields1(response.data.myinfo);
    });
  }, []);

  const handleFormChange1 = (jsonkey, event, index) => {
    const testdata1 = [...formFields1];
    testdata1[index][jsonkey] = event.target.value;
    //console.log(testdata1);
    setFormFields1([...testdata1]);
  };

  const addFields1 = () => {
    const testdata = [...formFields1, {}];
    setFormFields1([...testdata]);
  };

  const removeFields1 = (index) => {
    let data = [...formFields1];
    data.splice(index, 1); //remove 1 element from index
    setFormFields1(data);
  };

  const submit = (e) => {
    e.preventDefault();

    fetch(baseURL, {
      method: "POST",
      body: JSON.stringify({
        clientinfo: [...formFields],
        myinfo: [...formFields1],
      }),
    });
  };
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/contact`;
    navigate(path);
  };
  return (
    <>
      <section id="contact" className="contact">
        <form method="post" onSubmit={(e) => { submit(e); routeChange();}}  className="form">
          <div className="container">
            <div className="form-header">
              <h2 className="head-text">
                Contact
                <span className="underline underline-secondary" />
              </h2>
              <h2 className="text-secondary">Get In Touch</h2>
              <p>
                Want to connect with me or collaborate on projects together, You
                can send me a message and I'll reply as soon as I can.. Thank
                You.
              </p>
            </div>

            {/* Social */}

            <section className="icons-container">
              <div className="container">
                {Object.keys(formFields1).map((index) => {
                  return (
                    <>
                    {/* {console.log(Object.keys(formFields1[index])[0])} */}
                      <input 
                        onChange={(e) => handleFormChange1("link", e, index)}
                        name="link"
                        defaultValue={formFields1[index].link}
                        required
                      />
                      <input
                        onChange={(e) => handleFormChange1("title", e, index)}
                        name="title"
                        defaultValue={formFields1[index].title}
                        required
                      />
                      <input
                        onChange={(e) => handleFormChange1("className", e, index)}
                        name="className"
                        defaultValue={formFields1[index].className}
                        required
                      />
                      <button onClick={() => removeFields1(index)}>
                        remove skill
                      </button>

                      <br />
                    </>
                  );
                })}
                <div className="social icons"></div>
              </div>
            </section>
          </div>
          <button className="btn" type="submit" value="submit">
            Submit
          </button>
          <button className="btn" onClick={addFields1}>
            Add feature project
          </button>
        </form>
      </section>
    </>
  );
}
export default ContactAPI;
