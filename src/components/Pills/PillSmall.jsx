import "./PillSmall.css";

import React from "react";

function PillSmall({ content, nofill }) {
  return <div class={`pill-small ${nofill && "nofill"}`}>{content}</div>;
}

export default PillSmall;
