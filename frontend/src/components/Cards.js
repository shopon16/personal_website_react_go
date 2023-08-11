export  function ProjectCard(props){
  
  return(
    <>
    <article className="project-content">
      <div className="project-image project-image-one">
        <img src={`${process.env.PUBLIC_URL}${props.img}`} alt="Hashnode Clone" />
        <a className="btn btn-one" href={props.href} >Preview Link</a>
      </div>
      <div className="card-content">
        <h2>{props.projectName}</h2>
        <p>
          {props.contents}
          {/* This is a static clone of <a href="https://hashnode.com/">Hashnode's</a> landing page, an awesome blogging service for developers. I wrote an <a href="https://eke.hashnode.dev/i-built-hashnodes-landing-page-clone-with-sass">article</a> on what I learnt while building this project and it amazingly got featured on hashnode's Weekly digest <a href="https://e.customeriomail.com/deliveries/RIDfBQMAAX17ENgiGemJT4mx0Tfw7A==">#73</a>  */}
        </p>
        <div className="project-info">
          <div className="stack">
            <small className="language">{props.tag}</small>
          </div>
          <div className="project-links">
            <a href={props.link1} ><i className={props.class} /></a>
            <a href={props.link2} ><i className="fas fa-external-link-alt" /></a>
          </div>
        </div>
      </div>
    </article>
    </>
  );
}



export  function MoreCard(props){
  return(
    <>
    <div className="card">
            <div className="icon-header">
              {props.icon1}
              {props.icon2}
              
            </div>
            <header>
              <h3>{props.title}</h3>
              <p>
                {props.content}
              </p>
              <p>
                {props.content2}
              </p>
              
            </header>
            <ul>
              {props.keywords}
            </ul>
          </div>
    </>
  );
}
