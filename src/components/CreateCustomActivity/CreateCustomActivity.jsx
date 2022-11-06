import React, { useState } from "react";

function CreateCustomActivity({ form, setForm, moodData, setMoodData }) {
  const [isActive, setIsActive] = useState(false);
  const [newActivity, setNewActivity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function showForm() {
    setIsActive(!isActive);
  }

  function resetForm() {
    setIsActive(false);
    setNewActivity("");
  }

  function handleCreate(evt) {
    evt.preventDefault();

    if (!newActivity) {
      setErrorMessage("Nothing to add");
      return;
    }

    if (moodData.activities.some((e) => e.title === newActivity)) {
      setErrorMessage("Activity already exists.");
      return;
    }

    if (!moodData.activities.some((e) => e.title === newActivity)) {
      setMoodData({
        ...moodData,
        activities: [
          ...moodData.activities,
          { title: newActivity.trim(), custom: true },
        ],
      });

      setForm({ ...form, activities: [...form.activities, newActivity] });
    }
    setErrorMessage("");

    resetForm();
  }

  function handleChange(evt) {
    const { value } = evt.target;
    setNewActivity(value);
  }

  function preventSubmitOnEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreate(e);
      return;
    }
  }

  return (
    <div>
      <button className="btn-submit" type="button" onClick={showForm}>
        {isActive ? "Close" : "..."}
      </button>
      {isActive && (
        <div>
          <label>
            <input
              onChange={handleChange}
              type="text"
              placeholder="Something else"
              name="createActivity"
              value={newActivity}
              onKeyPress={preventSubmitOnEnter}
            />
          </label>
          <button className="btn-submit" type="button" onClick={handleCreate}>
            Create Activity
          </button>
          {errorMessage && <div>{errorMessage}</div>}
        </div>
      )}
    </div>
  );
}

export default CreateCustomActivity;
