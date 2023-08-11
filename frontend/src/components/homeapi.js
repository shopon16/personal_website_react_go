//import profile from "../img/projects/guy.jpg"
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_HOME_API;
export function HomeAPI() {
    //const [name, setName] = React.useState("");
    const [file, setFile] = useState("");
    const [post, setPost] = React.useState(null);
    const [formFields, setFormFields] = useState([""]);
    const [formFields1, setFormFields1] = useState([""]);
    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
        setPost(response.data)
          setFormFields(response.data.designation);
          setFormFields1(response.data.headline);
        });
      }, []);
      const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
          console.log(e.target.files[0])
        }
      };


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
    const submit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        fetch(baseURL, {
            method: form.method,
            body: JSON.stringify({
                name: formJson.myname,
                designation: [...formFields],
                headline: [...formFields1],
                button: formJson.button,
                homepic: formJson.homepic
            }),
        });
    };








    const handleUploadClick = () => {
        if (!file) {
            return;
          }
      
          const data = new FormData();
          data.append("file", file);
          
          console.log(data)
          let url = "http://localhost:8080/upload";
          // 👇 Uploading the file using the fetch API to the server
      
          fetch(
              url,
        
              {
                  //headers:{"Content-Type":"multipart/form-data"},
                method: "POST",
                body: data,
              }
            )
              .then((response) => response.json())
        
              .then((result) => {
                console.log("Success:", result);
              })
        
              .catch((error) => {
                console.error("Error:", error);
              });
    }
    let navigate = useNavigate();
    const routeChange = () => {
      let path = `/`;
      navigate(path);
    };

    if (!post) return null;

    return (
        <>
            <form method="post" onSubmit={(e) => { submit(e); routeChange();}} className="form">
                <header id="hero">

                    <section className="content container">

                        <div className="content-text">
                            <h1> <input defaultValue={post.name} name="myname" required /> </h1>
                            {
                                formFields.map((form, index) => {
                                    ///for bypass warning in console
                                    if (index === form.length - 1) {
                                        return (
                                            <>
                                                <textarea
                                                    onChange={(event) => handleFormChange(event, index)}
                                                    defaultValue={form}
                                                />
                                                <button className="btn" onClick={() => removeFields(index)}>
                                                    Remove
                                                </button>
                                            </>
                                        )
                                    }
                                    else {
                                        return (
                                            <>
                                                <textarea
                                                    onChange={(event) => handleFormChange(event, index)}
                                                    defaultValue={form}
                                                />

                                                <button className="btn" onClick={() => removeFields(index)}>
                                                    Remove
                                                </button>
                                            </>)
                                    }
                                })
                            }
                            {formFields1.map((form, index) => {
                                return (
                                <p>
                                    <textarea
                                    onChange={(event) => handleFormChange1(event, index)}
                                    defaultValue={form}
                                    />
                                    <button className="btn" onClick={() => removeFields1(index)}>
                                    Remove
                                    </button>
                                </p>
                                );
                            })}



                            
                            <input
                                name="button"
                                defaultValue={post.button}
                                required
                            />
                            <p>upload your latest resume</p>
                            

                                  <input name="file" type="file" onChange={handleFileChange} />
      <button onClick={handleUploadClick}>Upload</button>


                        </div>

                        <div className="content-image">
                            <div className="overlay-icons" />

                            <input
                                name="homepic"
                                defaultValue={post.homepic}
                                required
                            />
                            <h3>image path</h3>
                            <img src={`${process.env.PUBLIC_URL}${post.homepic}`} alt="omar faruque swapon" />
                        </div>

                    </section>
                </header>
                <button className="btn" type="submit" value="submit">
                    Submit
                </button>
                <button className="btn" onClick={addFields}>
                    Add designation..
                </button>
                <button className="btn" onClick={addFields1}>
                    Add headline..
                </button>
               
            </form>
        </>
    );
}
export default HomeAPI;