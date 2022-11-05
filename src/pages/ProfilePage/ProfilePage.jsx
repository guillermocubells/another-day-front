import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import DeleteUser from "../../components/Profile/DeleteUser";
import apiClient from "../../services/api-client";
import "./ProfilePage.css";
import EditProfile from "../../components/Profile/EditProfile";
import ChangePassword from "../../components/Profile/ChangePassword";

function ProfilePage() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get("/profile/")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  const { name } = user;

  return (
    <div>
      <h1>Hi, {name}</h1>
      Feel free to change your mind
      <br />
      Update your profile or change your username
      <div className="profile-layout">
        <div className="profile-card-layout">
          <EditProfile
            className="profile-card-layout"
            user={user}
            setUser={setUser}
          />
        </div>
        <div className="profile-card-layout">
          <ChangePassword />
        </div>
      </div>
      Do you want to <strong style={{ color: "red" }}>delete</strong> your
      account?
      <br />
      If you’re sure, confirm by logging in below.
      <div className="profile-card-layout">
        <DeleteUser />
      </div>
    </div>
  );
}

export default ProfilePage;
