import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import { MOOD_ASSETS } from "../../utils/consts";
import "./MoodCheckInForm.css";

import Loading from "../../components/Loading/Loading";

import ButtonSubmit from "../Buttons/ButtonSubmit";
import MoodCheckInActivities from "../MoodCheckInFormFields/MoodCheckInActivities";
import MoodCheckInDate from "../MoodCheckInFormFields/MoodCheckInDate";
import MoodCheckInImage from "../MoodCheckInFormFields/MoodCheckInImage";
import MoodCheckInNote from "../MoodCheckInFormFields/MoodCheckInNote";
import MoodCheckInStatus from "../MoodCheckInFormFields/MoodCheckInStatus";
import MoodCheckInSubstatus from "../MoodCheckInFormFields/MoodCheckInSubstatus";

function MoodCheckInForm({
  title,
  form,
  setForm,
  handleSubmit,
  errorMessage,
  setErrorMessage,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [moodData, setMoodData] = useState({
    mood_status: [],
    mood_substatus: [],
    activities: [],
  });

  // Getting Mood Data
  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get("/api")
      .then((res) => {
        setMoodData(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const { mood_status, mood_substatus, activities } = moodData;

  function handleChange(evt) {
    const { name, value } = evt.target;
    setForm({ ...form, [name]: value });
  }

  function resetSubstatus() {
    setForm({ ...form, substatus: "" });
  }

  function handleCheckbox(evt) {
    const { name, checked, id } = evt.target;
    if (checked) {
      setForm({ ...form, [name]: [...form[name], id] });
      return;
    }
    setForm({ ...form, [name]: form[name].filter((item) => item !== id) });
  }

  return (
    <section className="mood-check-in">
      <h1>{title}</h1>
      <div className={`mood-check-in__wrapper ${!form.status && "inactive"}`}>
        <h2>How are you feeling right now?</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: form.status ? MOOD_ASSETS[form.status].color : "",
          }}
        >
          {/* TODO! Make datetime display current time as default  */}
          <MoodCheckInDate date={form.date} handleChange={handleChange} />
          {/* Display Status */}
          <MoodCheckInStatus
            mood_status={mood_status}
            handleChange={handleChange}
            resetSubstatus={resetSubstatus}
            form={form}
          />
          <div className="mood-check-in__form-rest_wrapper">
            {/* If a Mood has been selected, show relative substatus */}
            {form.status && (
              <MoodCheckInSubstatus
                mood_substatus={mood_substatus}
                form={form}
                handleChange={handleChange}
              />
            )}
            {/* Get Activities. */}
            <MoodCheckInActivities
              activities={activities}
              handleCheckbox={handleCheckbox}
              form={form}
              setForm={setForm}
              moodData={moodData}
              setMoodData={setMoodData}
            />
            <MoodCheckInNote form={form} handleChange={handleChange} />
            <MoodCheckInImage form={form} handleChange={handleChange} />

            <ButtonSubmit>Submit</ButtonSubmit>
          </div>
          {errorMessage && <div>{errorMessage}</div>}
        </form>
      </div>
    </section>
  );
}

export default MoodCheckInForm;
