import React from "react";
import "../static/slider.css"
const Slider = (props) => {
  return (
    <div className="slider" id={props.id}>
    
    <label><b>{props.name}</b></label>
      <input
        type="range"
        className="form-range"
        min={props.min}
        max={props.max}
        step={props.step}
        id="customRange3"
        value={props.val}
        onChange={props.function}
        disabled={props.disbleoption}
      />
    </div>
  );
};

export default Slider;
