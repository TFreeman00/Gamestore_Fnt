import React from "react";
import { useParams } from "react-router-dom";
import { useGetGameByIdQuery } from "../api/gamesApi";
import { Link } from "react-router-dom";

function SingleGame() {
  const { id } = useParams();
  const { data } = useGetGameByIdQuery(id);

  return (
    <>
      <div>
        <h1>Title: {data?.title}</h1>
        <img src={data?.image} />
        <h2>Price: ${data?.price}</h2>
        <h2>Genre: {data?.genre}</h2>
        <h2>Platform: {data?.platform}</h2>
        <h2>First Release Date: {data?.first_release_date}</h2>
        <Link to={data?.trailer}>Watch The Trailer</Link>
        <p>Description: {data?.description}</p>
      </div>
    </>
  );
}
export default SingleGame;
