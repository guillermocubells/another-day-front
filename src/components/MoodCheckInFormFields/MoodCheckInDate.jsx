import React from "react";

function MoodCheckInDate({ handleChange, date }) {
  return (
    <label>
      Date
      <input
        type="datetime-local"
        name="date"
        step="60"
        onChange={handleChange}
        value={date}
      ></input>
    </label>
  );
}

export default MoodCheckInDate;
