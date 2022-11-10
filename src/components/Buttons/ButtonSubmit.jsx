import React from "react";

function ButtonSubmit({ children }) {
  return (
    <button className="btn-submit" type="submit">
      {children}
    </button>
  );
}

export default ButtonSubmit;
