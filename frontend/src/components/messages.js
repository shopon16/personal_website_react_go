import axios from "axios";
import React from "react";
const baseURL = process.env.REACT_APP_CONTACT_API;
function Messages(props){
  //console.log(userdata.social.github.link);
  const [post, setPost] = React.useState(null);
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);
  if (post === null) return;
    return(
        <>
       {
                  post.clientinfo.map((value,key)=>{
                    return(
                      <div>
                        <br/>
                      <h2>{value.name}</h2>
                      <p>contact number: {value.contact}</p>
                      <p>message from <b>{value.name}</b>: {value.message}</p>
                      <br/>
                      <hr/>
                      
                      </div>
                    );
                  })
                }         
        </>
    );
}
export default Messages;