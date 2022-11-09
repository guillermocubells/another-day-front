import "./PillSmall.css";

import React from "react";

function PillSmall({ content, nofill }) {
  return <div className={`pill-small ${nofill && "nofill"}`}>{content}</div>;
}

export default PillSmall;
