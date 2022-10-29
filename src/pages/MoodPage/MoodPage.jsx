import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import apiClient from "../../services/api-client";

function MoodPage() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get(`/api/mood/${id}`)
      .then((res) => {
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

  if (isError) {
    return;
  }

  const { _id, date, status, substatus, activities, journal } = data;

  return (
    <div>
      <article key={_id}>
        <h5>{new Date(date).toDateString()}</h5>
        <h2>{status}</h2>
        {substatus && <h3>{substatus[status]}</h3>}
        {activities && (
          <h4>{activities.map((activity) => activity.title).join(" ")}</h4>
        )}
        {journal && (
          <article>
            <h3>Journal</h3>
            <div>{journal}</div>
          </article>
        )}
        {/* <image /> */}
      </article>
    </div>
  );
}

export default MoodPage;
