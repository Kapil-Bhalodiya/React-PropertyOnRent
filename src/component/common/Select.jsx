import React, { Children } from "react";

const Button = props => {
    return(
        <select className="custom-select" style={{height : props.height , width : props.width, color : props.color}}>
            {props.Children}
        </select>
    )
}
export default Button;