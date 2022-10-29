import React, { useState } from "react";

function CreateCustomActivity({ moodData, setMoodData }) {
  const [isActive, setIsActive] = useState(false);
  const [newActivity, setNewActivity] = useState("");

  function showForm() {
    setIsActive(!isActive);
  }

  function resetForm() {
    setIsActive(false);
    setNewActivity("");
  }

  function handleCreate(evt) {
    evt.preventDefault();

    if (!moodData.activities.some((e) => e.title === newActivity)) {
      setMoodData({
        ...moodData,
        activities: [
          ...moodData.activities,
          { title: newActivity, custom: true },
        ],
      });
    }

    resetForm();
  }

  function handleChange(evt) {
    const { value } = evt.target;
    setNewActivity(value);
  }

  return (
    <>
      <button type="button" onClick={showForm}>
        ...
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
            />
          </label>
          <button type="button" onClick={handleCreate}>
            Create Activity
          </button>
        </div>
      )}
    </>
  );
}

export default CreateCustomActivity;
