import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetGameByIdQuery } from "../api/gamesApi";
import { Link } from "react-router-dom";

function SingleGame() {
  const { id } = useParams();
  const { data } = useGetGameByIdQuery(id);

  return (
    <div className="container mx-auto p-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white shadow-md rounded-lg p-4">
          <img
            src={data?.image}
            alt={data?.title}
            className="w-full h-52 object-cover mb-4 rounded-lg"
          />
          <h1 className="text-xl font-semibold mb-2">{data?.title}</h1>
          <h2 className="text-gray-600 mb-2">${data?.price}</h2>
          <p className="text-gray-500 mb-4">{data?.description}</p>
          <h2 className="text-gray-600 mb-2">Genre: {data?.genre}</h2>
          <h2 className="text-gray-600 mb-2">Platform: {data?.platform}</h2>
          <h2 className="text-gray-600 mb-2">
            First Release Date: {data?.first_release_date}
          </h2>
          <Link to={data?.trailer} className="text-blue-500 hover:underline">
            Watch The Trailer
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SingleGame;
