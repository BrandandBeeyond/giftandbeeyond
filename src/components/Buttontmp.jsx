import React from "react";

const Buttontmp = ({text="Add to cart",disabled,onClick}) => {
  return (
    <button className="btntmp" disabled={disabled} onClick={onClick}>
      <span className="font-della">{text}</span>
    </button>
  );
};

export default Buttontmp;
