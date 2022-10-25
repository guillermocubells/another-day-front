import "./HomePage.css";
import React from "react";
import MoodCheckInForm from "../../components/MoodCheckInForm/MoodCheckInForm";
import MoodList from "../../components/MoodList/MoodList";

function HomePage() {
  return (
    <>
      <MoodCheckInForm />
      <MoodList />
    </>
  );
}

export default HomePage;
