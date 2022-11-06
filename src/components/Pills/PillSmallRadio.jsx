import "./PillSmall.css";
import React from "react";

function PillSmallRadio({ item, handleChange, checked }) {
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
      className={`pill-small pill-radio ${checkIfThereIsACheckedProperty()}`}
    >
      {item}
      <input
        type="radio"
        value={item}
        name="substatus"
        checked={checked}
        onChange={handleChange}
      />{" "}
    </label>
  );
}

export default PillSmallRadio;
