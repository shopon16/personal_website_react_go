import { useState} from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = process.env.REACT_APP_ABOUT_API;
export default function AboutAPI() {
  const [get, setGet] = React.useState(null);
  const [formFields, setFormFields] = useState([""]);
  const [formFields1, setFormFields1] = useState([""]);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setGet(response.data);
      setFormFields(response.data.shortbio);
      setFormFields1(response.data.tech);
    });
  }, []);

  React.useEffect(() => {
    fetch(baseURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setGet(response));
  }, []);

  const handleFormChange = (event, index) => {
    
    let data = [...formFields];
    data[index] = event.target.value;
    setFormFields(data);
  };
  const handleFormChange1 = (event, index) => {
    let data1 = [...formFields1];
    data1[index] = event.target.value;
    setFormFields1(data1);
  };

  const submit = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_ABOUT_API, {
      method: "post",
      body: JSON.stringify({
        shortbio: [...formFields],
        tech: [...formFields1],
      }),
    });
  };

  const addFields = () => {
    let object = [""];

    setFormFields([...formFields, object]);
  };
  const addFields1 = () => {
    let object1 = [""];

    setFormFields1([...formFields1, object1]);
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

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/about`;
    navigate(path);
  };





  if (!get) return null;
  return (
    <>
      {/* About Section */}
      <section id="about">
        <div className="bio container">
          <form method="post" className="form">
            <h2 className="head-text">
              ABOUT ME
              <span className="underline underline-primary" />
            </h2>
            {formFields.map((value, key) => {
              return (
                <>
                  <textarea
                    key={key}
                    onChange={(event) => handleFormChange(event, key)}
                    value={value}
                  />
                  <button className="btn" onClick={() => removeFields(key)}>
                    Remove
                  </button>
                </>
              );
            })}

            <p>
              Technologies and tools I'm currently exploring and interested
              about.
            </p>
            <ul className="language">
              {formFields1.map((form, key) => {
                return (
                  <li key={key}>
                    <textarea
                      onChange={(event) => handleFormChange1(event, key)}
                      value={form}
                    />
                    <button className="btn" onClick={() => removeFields1(key)}>
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              className="btn"
              onClick={(e) => {
                submit(e);
                routeChange();
              }}
            >
              Submit
            </button>
            <button className="btn" onClick={addFields}>
              Add content..
            </button>
            <button className="btn" onClick={addFields1}>
              Add technology..
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
