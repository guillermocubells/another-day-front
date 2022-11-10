import React from "react";
import { MOOD_ASSETS } from "../../utils/consts";

function MoodCheckInStatus({
  mood_status,
  form,
  handleChange,
  resetSubstatus,
}) {
  return (
    <div className="mood-check-in__form-status-wrapper">
      {/* Setting Up Mood Selection */}
      {mood_status.map((status, index) => {
        return (
          <label
            key={index}
            onClick={resetSubstatus}
            className={`mood-check-in__form-status ${
              form.status &&
              (form.status?.includes(status) ? "active" : "inactive")
            }`}
          >
            <img
              src={MOOD_ASSETS[status].image}
              alt={`${status} smiley face`}
              className="smiley-image"
            />
            <h3>{status}</h3>
            <input
              type="radio"
              value={status}
              name="status"
              checked={form.status && form.status?.includes(status)}
              onChange={handleChange}
            />{" "}
          </label>
        );
      })}
    </div>
  );
}

export default MoodCheckInStatus;
