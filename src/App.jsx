import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import MoodPage from "./pages/MoodPage/MoodPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import EditMoodPage from "./pages/EditMoodPage/EditMoodPage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <IsPrivate>
              <HomePage />
            </IsPrivate>
          }
        />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/mood/:id"
          element={
            <IsPrivate>
              <MoodPage />
            </IsPrivate>
          }
        />
        <Route
          path="/mood/:id/edit"
          element={
            <IsPrivate>
              <EditMoodPage />
            </IsPrivate>
          }
        />
        <Route
          path="/dashboard"
          element={
            <IsPrivate>
              <DashboardPage />
            </IsPrivate>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
