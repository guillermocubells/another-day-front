import "./MoodCheckInForm.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import apiClient from "../../services/api-client";
import Loading from "../../components/Loading/Loading";
import CreateCustomActivity from "../CreateCustomActivity/CreateCustomActivity";
import { MOOD_ASSETS } from "../../utils/consts";

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
      <h2>How are you feeling right now?</h2>
      {errorMessage && <div>{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        {/* TODO! Make datetime display current time as default  */}
        <label>
          Date
          <input
            type="datetime-local"
            name="date"
            onChange={handleChange}
            value={form.date}
          ></input>
        </label>
        <br />
        {/* Setting Up Mood Selection */}
        {mood_status.map((status, index) => {
          return (
            <label key={index} className="mood-check-in__form-status">
              <img
                src={MOOD_ASSETS[status].image}
                alt={`${status} smiley face`}
                className="smiley-image"
              />
              {status}
              <input
                type="radio"
                value={status}
                name="status"
                onChange={handleChange}
              />{" "}
            </label>
          );
        })}

        {/* If a Mood has been selected, show relative substatus */}
        {form.status && <br />}
        {form.status &&
          mood_substatus[form.status].map((item, index) => {
            return (
              <label key={index}>
                {item}
                <input
                  type="radio"
                  value={item}
                  name="substatus"
                  onChange={handleChange}
                />{" "}
              </label>
            );
          })}
        <br />
        {/* Get Activities. 
      TODO! create array from selected values
      TODO! create the option to create a new activity. */}
        <h4>What are you doing?</h4>
        {activities.map((activity, index) => {
          const { _id, title } = activity;
          return (
            <label key={_id || title}>
              {title}
              <input
                type="checkbox"
                name="activities"
                id={title}
                onChange={handleCheckbox}
                checked={form.activities.some((e) => e === title)}
              ></input>
            </label>
          );
        })}
        <CreateCustomActivity
          form={form}
          setForm={setForm}
          moodData={moodData}
          setMoodData={setMoodData}
        />

        <br />
        <label>
          Note
          <textarea
            type="text"
            name="journal"
            onChange={handleChange}
            value={form.journal}
          ></textarea>
        </label>
        <br />
        <label>
          Image
          <input
            type="file"
            name="image"
            onChange={handleChange}
            value={form.image}
          ></input>
        </label>
        <br />
        <button className="submits" type="submit">
          Check In
        </button>
      </form>
    </section>
  );
}

export default MoodCheckInForm;
