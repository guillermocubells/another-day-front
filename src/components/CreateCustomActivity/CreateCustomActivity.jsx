import React, { useState } from "react";
import styles from "./CreateCustomActivity.module.css";
import ButtonRegular from "../Buttons/ButtonRegular";

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
      <ButtonRegular handleClick={showForm}>
        {isActive ? "Close" : "..."}
      </ButtonRegular>
      {isActive && (
        <div className={styles.activityWrapper}>
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
          <ButtonRegular handleClick={handleCreate}>
            Create Activity
          </ButtonRegular>

          {errorMessage && <div>{errorMessage}</div>}
        </div>
      )}
    </div>
  );
}

export default CreateCustomActivity;
