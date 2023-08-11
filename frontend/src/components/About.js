import React from "react";

const baseURL = process.env.REACT_APP_ABOUT_API;
export function About() {
  const [get, setGet] = React.useState(null);
  console.log("tesinng nginx build3");
  
  React.useEffect(() => {
    fetch(baseURL, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
})
   .then(response => response.json())
   .then(response => setGet(response))
  }, []);

  if (!get) return null;
    return(
        <>
        {/* About Section */}
        <section id="about">
        <div className="bio container">
          <h2 className="head-text">
            ABOUT ME<span className="underline underline-primary" />

          </h2>
          {
            
            get.shortbio.map((value,key)=>{
              
            return(
            <p key={key}>
              {value}
            </p>);  
            })
          }
          <p>
            Technologies and tools I'm currently exploring and interested about.
          </p>
          <ul className="language">
          {
            get.tech.map((value,key)=>{
            return(
            <li key={key}>
              {value}
            </li>);  
            })
          }       
          </ul>

        </div>
      </section>
      </>
    );
}
