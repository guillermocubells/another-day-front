import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import apiClient from "../../services/api-client";
import Loading from "../../components/Loading/Loading";

function MoodCheckInForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [moodData, setMoodData] = useState({
    mood_status: [],
    mood_substatus: [],
    activities: [],
  });

  const [form, setForm] = useState({
    status: "",
    substatus: "",
    activities: [],
    description: "",
    date: new Date(),
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

    apiClient
      .post("/api/mood/create", form)
      .then((response) => {
        const { data } = response;
        navigate(`/mood/${data._id}`);
      })
      .catch((err) => {
        if (err?.response?.data.code === 1) {
          // navigate
          return navigate(`/mood/${err.response.data._id}`);
        }
        console.log("err:", err);
      });
  }

  return (
    <section className="mood-check-in">
      <h1>Mood Check</h1>
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
                onChange={handleCheckbox}
                checked={form.activities.id}
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
    </section>
  );
}

export default MoodCheckInForm;
