import "./HomePage.css";
import React from "react";
import MoodCheckInForm from "../../components/MoodCheckInForm/MoodCheckInForm";
import MoodList from "../../components/MoodList/MoodList";
// import { useContext } from "react";
// import { AuthContext } from "../../context/auth.context";
// import { Link } from "react-router-dom";

function HomePage() {
  // const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <main className="home">
      <MoodCheckInForm />
      <MoodList />
    </main>
  );
}

export default HomePage;
