import "./MoodCheckInForm.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import apiClient from "../../services/api-client";
import Loading from "../../components/Loading/Loading";
import CreateCustomActivity from "../CreateCustomActivity/CreateCustomActivity";
import PillSmallCheckbox from "../Pills/PillSmallCheckbox";

import { MOOD_ASSETS } from "../../utils/consts";
import PillSmallRadio from "../Pills/PillSmallRadio";

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
          <label>
            Date
            <input
              type="datetime-local"
              name="date"
              step="60"
              onChange={handleChange}
              value={form.date}
            ></input>
          </label>
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
          <div className="mood-check-in__form-rest_wrapper">
            {/* If a Mood has been selected, show relative substatus */}
            {form.status && (
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
            )}

            {/* Get Activities. 
      TODO! create array from selected values
      TODO! create the option to create a new activity. */}
            <h4>What are you doing?</h4>
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
            <label>
              Note
              <textarea
                type="text"
                name="journal"
                onChange={handleChange}
                value={form.journal}
              ></textarea>
            </label>
            <label className="mood-check-in__form-image mood-check-in__form-flex">
              Image
              <input
                type="file"
                name="image"
                onChange={handleChange}
                value={form.image}
              ></input>
            </label>

            <button className="btn-submit" type="submit">
              Check In
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default MoodCheckInForm;
