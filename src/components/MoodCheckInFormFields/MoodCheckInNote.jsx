import React from "react";

function MoodCheckInNote(form, handleChange) {
  return (
    <label>
      Note
      <textarea
        type="text"
        name="journal"
        onChange={handleChange}
        value={form.journal}
      ></textarea>
    </label>
  );
}

export default MoodCheckInNote;
