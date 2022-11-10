import React from "react";

function MoodCheckInImage({ form, handleChange }) {
  return (
    <label className="mood-check-in__form-image mood-check-in__form-flex">
      <div className="submits">Upload Image</div>
      <input
        type="file"
        name="image"
        onChange={handleChange}
        value={form.image}
      ></input>
    </label>
  );
}

export default MoodCheckInImage;
