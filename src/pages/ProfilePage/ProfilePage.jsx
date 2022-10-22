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
      <hr />
      <EditProfile user={user} setUser={setUser} />
      <hr />
      <ChangePassword />
      <hr />
      <DeleteUser />
    </div>
  );
}

export default ProfilePage;
