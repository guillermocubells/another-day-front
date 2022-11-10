import React from "react";
import PillSmallRadio from "../Pills/PillSmallRadio";

function MoodCheckInSubstatus({ handleChange, form, mood_substatus }) {
  return (
    <div className="mood-check-in__form-substatus-wrapper">
      {" "}
      {mood_substatus[form.status].map((item, index) => {
        return (
          <PillSmallRadio
            key={index}
            item={item}
            checked={form.substatus && form.substatus?.includes(item)}
            handleChange={handleChange}
          />
        );
      })}
    </div>
  );
}

export default MoodCheckInSubstatus;
