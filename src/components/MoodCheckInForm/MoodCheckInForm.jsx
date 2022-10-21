import React, { useState } from "react";
import apiClient from "../../services/api-client";

import { useNavigate } from "react-router-dom";

function MoodCheckInForm({ activities, mood_status, mood_substatus }) {
  console.log(activities, mood_status, mood_substatus);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    status: "",
    substatus: "",
    activities: "",
    description: "",
    date: new Date(),
    image: "",
  });
  console.log(form);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    apiClient
      .post("/api/mood/create", form)
      .then(({ data }) => {
        console.log("data:", data);
        navigate(`/mood/${data.slug}`);
      })
      .catch((err) => {
        if (err?.response?.data.code === 1) {
          // navigate
          return navigate(`/mood/${err.response.data.slug}`);
        }
        console.log("err:", err);
      });
  }

  return (
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
          <label key={index}>
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
      {activities.map((activity, index) => {
        return (
          <label key={index}>
            {activity}
            <input
              type="checkbox"
              name="activities"
              id={activity}
              onChange={handleChange}
              value={form.activities}
            ></input>
          </label>
        );
      })}

      <br />
      <label>
        Journal
        <textarea
          type="text"
          name="description"
          onChange={handleChange}
          value={form.description}
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
      <button type="submit">Check In</button>
    </form>
  );
}

export default MoodCheckInForm;
