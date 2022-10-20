import "./HomePage.css";
import React, { useState } from "react";
import apiClient from "../../services/api-client";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [form, setForm] = useState({
    status: "",
    properties: "",
    activity: "",
    description: "",
    date: new Date(),
    image: "",
  });

  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;

    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log({ form });

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
    <div>
      <h1>Mood Check</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          Awful
          <input
            type="radio"
            value="bad"
            name="status"
            onChange={handleChange}
          />{" "}
          Bad
          <input
            type="radio"
            value="okey"
            name="status"
            onChange={handleChange}
          />{" "}
          Okey
          <input
            type="radio"
            value="good"
            name="status"
            onChange={handleChange}
          />{" "}
          Good
          <input
            type="radio"
            value="great"
            name="status"
            onChange={handleChange}
          />{" "}
          Great
        </label>
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
    </div>
  );
}

export default HomePage;
