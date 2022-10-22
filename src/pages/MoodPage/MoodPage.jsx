import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import apiClient from "../../services/api-client";

function MoodPage() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  console.log("isError:", isError);

  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get(`/api/mood/${id}`)
      .then((res) => {
        console.log("data", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);
  if (isLoading) {
    return <Loading />;
  }
  console.log("Helga");
  return (
    <div>
      <article key={data._id}>
        <h5>{new Date(data.date).toDateString()}</h5>
        <h2>{data.status}</h2>
        <h3>{data.substatus[data.status]}</h3>
        <h4>{data.activities.join(" ")}</h4>
        {/* <image /> */}
      </article>
    </div>
  );
}

export default MoodPage;
