import "./MoodCheckInForm.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import apiClient from "../../services/api-client";
import Loading from "../../components/Loading/Loading";

import { MOOD_ASSETS } from "../../utils/consts";
import MoodCheckInDate from "../MoodCheckInFormFields/MoodCheckInDate";
import MoodCheckInStatus from "../MoodCheckInFormFields/MoodCheckInStatus";
import MoodCheckInSubstatus from "../MoodCheckInFormFields/MoodCheckInSubstatus";
import MoodCheckInActivities from "../MoodCheckInFormFields/MoodCheckInActivities";
import MoodCheckInNote from "../MoodCheckInFormFields/MoodCheckInNote";
import MoodCheckInImage from "../MoodCheckInFormFields/MoodCheckInImage";
import ButtonSubmit from "../Buttons/ButtonSubmit";

function MoodCheckInForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [moodData, setMoodData] = useState({
    mood_status: [],
    mood_substatus: [],
    activities: [],
  });

  const [form, setForm] = useState({
    status: "",
    substatus: "",
    activities: [],
    journal: "",
    date: new Date(new Date().toString().split("GMT")[0] + " UTC")
      .toISOString()
      .split(".")[0],
    image: "",
  });

  // Getting Mood Data
  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get("/api")
      .then((res) => {
        setMoodData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
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

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    apiClient
      .post("/api/mood/create", form)
      .then((response) => {
        const { data } = response;
        navigate(`/mood/${data._id}`);
      })
      .catch((err) => {
        console.error(err);
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  }
  return (
    <section className="mood-check-in">
      <h1>Check In</h1>
      <div className={`mood-check-in__wrapper ${!form.status && "inactive"}`}>
        <h2>How are you feeling right now?</h2>
        {errorMessage && <div>{errorMessage}</div>}
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

            <ButtonSubmit>Check In</ButtonSubmit>
          </div>
        </form>
      </div>
    </section>
  );
}

export default MoodCheckInForm;
