import "./EditMoodPage.css";
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import apiClient from "../../services/api-client";
import MoodCheckInForm from "../../components/MoodCheckInForm/MoodCheckInForm";

import Loading from "../../components/Loading/Loading";
import DeleteButton from "../../components/DeleteButton/DeleteButton";

function EditMoodPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");

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
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loading />;
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

  return (
    <main className="mood-check-in">
      <h1>Edit Mood Entry</h1>
      <MoodCheckInForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        errorMessage={message}
        setErrorMessage={setMessage}
      />
      <DeleteButton id={id} />
      {message && <div>{message}</div>}
    </main>
  );
}

export default EditMoodPage;
