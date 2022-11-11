import "./PillSmall.css";

import React from "react";

function PillSmall({ content, nofill, children }) {
  return (
    <div className={`pill-small ${nofill && "nofill"}`}>
      {content}
      {children}
    </div>
  );
}

export default PillSmall;
