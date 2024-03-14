import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gamesApi } from "../api/gamesApi";
import { useGetUsersQuery } from "../api/usersApi"; // Import the hook for fetching user data
import {
  useCreateGameMutation,
  useUpdateGameMutation,
  useDeleteGameMutation,
} from "../api/gamesApi";
import Modal from "./modal";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.gameSlice.games);
  const { data: currentUser } = useGetUsersQuery();
  const { token } = useSelector((state) => state.authSlice) ?? {};

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    genre: "",
    first_release_date: "",
    image: "",
    price: "",
    trailer: "",
    description: "",
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 5;

  useEffect(() => {
    dispatch(gamesApi.endpoints.getAllGames.initiate());
  }, [dispatch]);

  const handleDeleteGame = (id) => {
    dispatch(
      useDeleteGameMutation({
        id,
        token,
      })
    );
  };

  const handleEditGame = (game) => {
    setFormData(game);
    setShowEditModal(true);
  };

  const handleCreateGame = () => {
    setFormData({
      id: null,
      title: "",
      genre: "",
      first_release_date: "",
      image: "",
      price: "",
      trailer: "",
      description: "",
    });
    setShowCreateModal(true);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Logic for displaying games pagination
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mt-8 mb-4">
        Admin Dashboard
      </h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Games</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleCreateGame}
        >
          Add Game
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Genre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  First Release Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trailer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentGames.map((game) => (
                <tr key={game.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{game.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{game.genre}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {game.first_release_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{game.image}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{game.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {game.trailer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {game.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-1 px-2 rounded mr-2"
                      onClick={() => handleEditGame(game)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-black font-bold py-1 px-2 rounded"
                      onClick={() => handleDeleteGame(game.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <ul className="flex justify-center mt-4">
          {[...Array(Math.ceil(games.length / gamesPerPage)).keys()].map(
            (number) => (
              <li key={number} className="cursor-pointer mx-1">
                <a
                  className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
                  onClick={() => paginate(number + 1)}
                >
                  {number + 1}
                </a>
              </li>
            )
          )}
        </ul>
      </section>
      {showEditModal && (
        <Modal
          title="Edit Game"
          formData={formData}
          setFormData={setFormData}
          mutation={useUpdateGameMutation}
          token={token}
          setShowModal={setShowEditModal}
        />
      )}
      {showCreateModal && (
        <Modal
          title="Create Game"
          formData={formData}
          setFormData={setFormData}
          mutation={useCreateGameMutation}
          token={token}
          setShowModal={setShowCreateModal}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
