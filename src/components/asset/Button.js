import React from "react";
import "../static/Button.css";
const Button = (props) => {
  return (
    <div className="b" id="btn">
      <button className="btn1" onClick={props.function} disabled={props.disbleoption}>
        {props.name}
      </button>
    </div>
  );
};

export default Button;
