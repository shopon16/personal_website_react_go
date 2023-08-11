function Icon(props){
    
    return(
        <>
        <a href={props.link} title={props.title}  className={props.class}>{props.anchor_text}</a>
        </>
    );
}

function Keywords(props){

    return(
        <>
        <li className="language">{props.keyword}</li>
        </>
    );
}

export {Icon, Keywords};
