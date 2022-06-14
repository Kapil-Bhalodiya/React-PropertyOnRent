import React from "react";

const Button = props => {
    return(
        <button className="custom-button" style={{height : props.height , width : props.width, color : props.color}}>{props.title}</button>
    )
}
export default Button;
