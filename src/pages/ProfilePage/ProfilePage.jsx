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
    <main className="profile">
      <h1>Hi, {name}</h1>
      <div className="text-size-medium">
        Feel free to change your mind... or just your settings.
      </div>
      <section className="profile-wrapper">
        <EditProfile user={user} setUser={setUser} />
        <ChangePassword />
        <DeleteUser />
      </section>
    </main>
  );
}

export default ProfilePage;
