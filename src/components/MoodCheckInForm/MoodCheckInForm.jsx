import React, { useState } from "react";
import apiClient from "../../services/api-client";

import { useNavigate } from "react-router-dom";

function MoodCheckInForm({ activities, mood_status }) {
  console.log(activities, mood_status);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    status: "",
    properties: "",
    activity: "",
    description: "",
    date: new Date(),
    image: "",
  });

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

      <br />
      <label>
        Pumped
        <input
          type="checkbox"
          name="pumped"
          onChange={handleChange}
          value={form.properties}
        ></input>
      </label>
      <label>
        Content
        <input
          type="checkbox"
          name="content"
          onChange={handleChange}
          value={form.properties}
        ></input>
      </label>
      <label>
        Stressed
        <input
          type="checkbox"
          name="stressed"
          onChange={handleChange}
          value={form.properties}
        ></input>
      </label>
      <br />
      <label>
        Activity
        <input
          type="text"
          name="activity"
          onChange={handleChange}
          value={form.activity}
        ></input>
      </label>
      <br />
      <label>
        Description
        <input
          type="text"
          name="description"
          onChange={handleChange}
          value={form.description}
        ></input>
      </label>
      <br />
      <label>
        Date
        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={form.date}
        ></input>
      </label>
      <label>
        Image
        <input
          type="text"
          name="image"
          onChange={handleChange}
          value={form.image}
        ></input>
      </label>
      <button type="submit">Check In</button>
    </form>
  );
}

export default MoodCheckInForm;
