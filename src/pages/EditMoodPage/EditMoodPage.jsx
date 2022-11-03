import "./EditMoodPage.css";

import React from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/api-client";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import CreateCustomActivity from "../../components/CreateCustomActivity/CreateCustomActivity";
import DeleteButton from "../../components/DeleteButton/DeleteButton";

function EditMoodPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMoodData, setIsLoadingMoodData] = useState(true);

  const [message, setMessage] = useState("");

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
    date: new Date(),
    image: "",
  });

  useEffect(() => {
    setIsLoading(true);
    setIsLoadingMoodData(true);
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

    apiClient
      .get(`/api/mood/${id}`)
      .then((res) => {
        if (res.data) {
          const { activities, status, date, journal, image, substatus } =
            res.data;
          setForm({
            status,
            date: new Date(new Date(date).toString().split("GMT")[0] + " UTC")
              .toISOString()
              .split(".")[0],
            journal,
            image,
            substatus: substatus && substatus[status],
            activities: activities.map((item) => item.title),
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setIsLoadingMoodData(false);
      });
  }, [id]);

  if (isLoading && isLoadingMoodData) {
    return <Loading />;
  }

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
    setMessage("");

    apiClient
      .post(`/api/mood/${id}/edit`, form)
      .then((response) => {
        setMessage("Successfully Updated");
      })
      .catch((err) => {
        console.error(err);
        const errorDescription = err.response.data.message;
        setMessage(errorDescription);
      });
  }

  const { mood_status, mood_substatus, activities } = moodData;

  return (
    <section className="mood-check-in">
      <h1>Edit</h1>
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
        <h4>How are you feeling right now?</h4>
        {/* Setting Up Mood Selection */}
        {mood_status.map((status, index) => {
          return (
            <label key={index}>
              {status}
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

        {/* If a Mood has been selected, show relative substatus */}
        {form.status && <br />}
        {form.status &&
          mood_substatus[form.status]?.map((item, index) => {
            return (
              <label key={index}>
                {item}
                <input
                  type="radio"
                  value={item}
                  name="substatus"
                  checked={form.substatus && form.substatus?.includes(item)}
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
                checked={form.activities?.some((e) => e === title)}
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
          Journal
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
        <button type="submit">Save Changes</button>
      </form>
      <DeleteButton id={id} />
      {message && <div>{message}</div>}
    </section>
  );
}

export default EditMoodPage;
