import React from "react";

function ButtonRegular({ children, handleClick }) {
  return (
    <button className="submits" type="button" onClick={handleClick}>
      {children}
    </button>
  );
}

export default ButtonRegular;
