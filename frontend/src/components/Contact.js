import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const baseURL = process.env.REACT_APP_CONTACT_API;
function Contact() {
  const [post, setPost] = React.useState(null);
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    fetch(baseURL, {
      method: "POST",
      body: JSON.stringify({
        clientinfo: [
          ...post.clientinfo,
          {
            name: formJson.name,
            contact: formJson.contact,
            message: formJson.message,
          },
        ],
        myinfo: [...post.myinfo],
      }),
    });
  };
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/messages`; 
    navigate(path);
  }
  if (post === null) return;
  return (
    <>
      <section id="contact" className="contact">
        <div className="container">
          <div className="form-header">
            <h2 className="head-text">
              Contact
              <span className="underline underline-secondary" />
            </h2>
            <h2 className="text-secondary">Get In Touch</h2>
            <p>
              Want to connect with me or collaborate on projects together, You
              can send me a message and I'll reply as soon as I can.. Thank You.
            </p>
          </div>
          <div className="form-container">
            <div className="form-image" />
            <div className="form-page">
              <form method="post" onSubmit={(e) => { submit(e); routeChange();}} className="form">
                <div className="form-group group-bg">
                  <label htmlFor="Name">Name</label>
                  <input
                    name="name"
                    type="text"
                    id="Name"
                    placeholder="Enter Name"
                    required
                  />
                </div>
                <div className="form-group group-bg">
                  <label htmlFor="Subject">
                    How can I reach you?(Twitter username or Linkedin)
                  </label>
                  <input
                    name="contact"
                    type="text"
                    id="Subject"
                    placeholder="How can I reach you? (Twitter username or Linkedin)"
                    required
                  />
                </div>
                <div className="form-group group-bg">
                  <label htmlFor="Message">Message</label>
                  <textarea
                    name="message"
                    id="Message"
                    placeholder="Message"
                    defaultValue={""}
                  />
                </div>
                <div className="form-group">
                  <button type="submit" value="submit" className="btn">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Social */}
          <section className="icons-container">
            <div className="container">
              <div className="social icons">
                {post.myinfo.map((value,key) => {
                  //console.log(value);
                  return (
                    <a
                      key={key}
                      href={value.link}
                      title={value.title}
                      className={value.className}
                    >
                      {}
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
export default Contact;
