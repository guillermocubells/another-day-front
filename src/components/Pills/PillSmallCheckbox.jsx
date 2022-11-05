import "./PillSmall.css";

import React from "react";

function PillSmallCheckbox({ title, handleCheckbox, checked }) {
  function checkIfThereIsACheckedProperty() {
    if (checked === true) {
      return "active";
    } else if (checked === "") {
      return;
    } else {
      return "inactive";
    }
  }

  return (
    <label
      className={`pill-small pill-checkbox ${checkIfThereIsACheckedProperty()}`}
    >
      {title}
      <input
        type="checkbox"
        name="activities"
        id={title}
        onChange={handleCheckbox}
        checked={checked}
      ></input>
    </label>
  );
}

export default PillSmallCheckbox;
