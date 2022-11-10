import React from "react";
import CreateCustomActivity from "../CreateCustomActivity/CreateCustomActivity";
import PillSmallCheckbox from "../Pills/PillSmallCheckbox";

function MoodCheckInActivities({
  activities,
  handleCheckbox,
  form,
  setForm,
  moodData,
  setMoodData,
}) {
  return (
    <div className="mood-check-in__form-activities-wrapper">
      What are you doing?
      <div className="mood-check-in__form-activities mood-check-in__form-flex">
        {activities.map((activity, index) => {
          const { _id, title } = activity;
          return (
            <PillSmallCheckbox
              key={_id || title}
              title={title}
              handleCheckbox={handleCheckbox}
              checked={
                form.activities.length
                  ? form.activities.some((e) => e === title)
                  : ""
              }
            />
          );
        })}
        <CreateCustomActivity
          form={form}
          setForm={setForm}
          moodData={moodData}
          setMoodData={setMoodData}
        />
      </div>
    </div>
  );
}

export default MoodCheckInActivities;
