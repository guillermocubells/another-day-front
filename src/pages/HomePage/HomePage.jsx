import "./HomePage.css";
import React from "react";
import MoodCheckInForm from "../../components/MoodCheckInForm/MoodCheckInForm";
import MoodList from "../../components/MoodList/MoodList";
import { useState } from "react";
import apiClient from "../../services/api-client";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
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
  const [errorMessage, setErrorMessage] = useState("");

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
    <main className="home">
      <MoodCheckInForm
        title={"Check In"}
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <MoodList />
    </main>
  );
}

export default HomePage;
