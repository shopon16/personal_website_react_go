//import profile from "../img/projects/guy.jpg"
import React from "react";

const baseURL = process.env.REACT_APP_HOME_API;
function Intro(){
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    fetch(baseURL, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
})
   .then(response => response.json())
   .then(response => setPost(response))
  }, []);

  if (!post) return null;
    return(
        <>
        <header id="hero">

        <section className="content container">
            <div className="content-text">
              <h1>{post.name}<span className="underline" /></h1>
              {
                post.designation.map((value,key)=>{
                   ///for bypass warning in console
                  if(key===post.designation.length-1){
                    return(<h2 key={key} className="text-secondary">& {value}</h2>)
                  }
                  else{
                  return(<h2 key={key} className="text-secondary">{value},</h2>)
                  }
                })
              }
                            {
                post.headline.map((value,key)=>{
                    return(<p key={key}> {value}</p>)
                })
              }
              <a target="_blank" rel="noreferrer" href={process.env.REACT_APP_MACHINE_ENDPOINT+"/content/pdf/resume_shopon.pdf"} className="btn">{post.button} </a>
            </div>
            <div className="content-image">
              <div className="overlay-icons" />
              <img src={process.env.REACT_APP_MACHINE_ENDPOINT+"/content/images/guy.jpg"} alt="omar faruque swapon"/>
            </div>
          </section>
          </header>
        </>
    );
}
export default Intro;