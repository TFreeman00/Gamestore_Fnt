import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useCreateGameMutation } from "../api/gamesApi";
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [createGame] = useCreateGameMutation();
  const [showNotification, setShowNotification] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    genre: "",
    first_release_date: "",
    image: "",
    price: "",
    trailer: "",
    description: "",
    platform: "",
  });
  const updateForm = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const submitForm = async (e) => {
    e.preventDefault();
    const result = await createGame({
      ...formData,
      price: Number(formData.price),
    });
    console.log(result);
    try {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.log("Error game not added", error);
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url('https://i.pinimg.com/originals/42/b9/01/42b901d96c8588f3aa95f1492a3648ae.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="max-w-md w-full mx-4 md:mx-auto p-8 bg-white shadow-md rounded-lg"
        style={{ opacity: 0.9 }}
      >
        <h1 className="text-3xl font-bold mb-8 mt-8 text-center ">
          Add New Game
        </h1>
        <form onSubmit={submitForm} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="title" className="block mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={updateForm}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="genre" className="block mb-2">
              Genre
            </label>
            <input
              type="text"
              name="genre"
              id="genre"
              onChange={updateForm}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="first_release_date" className="block mb-2">
              First Release Date
            </label>
            <input
              type="text"
              name="first_release_date"
              id="first_release_date"
              onChange={updateForm}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block mb-2">
              Image
            </label>
            <input
              type="text"
              name="image"
              id="image"
              onChange={updateForm}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-2">
              Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              onChange={updateForm}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="trailer" className="block mb-2">
              Trailer
            </label>
            <input
              type="text"
              name="trailer"
              id="trailer"
              onChange={updateForm}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              onChange={updateForm}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="platform" className="block mb-2">
              Platform
            </label>
            <input
              type="text"
              name="platform"
              id="platform"
              onChange={updateForm}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mt-4 flex flex-col items-center justify-center">
            <button
              type="submit"
              className="relative bottom-4 left-4 hover:bg-blue hover:text-white bg-transparent border border-black rounded-md px-3 py-1 transition duration-300 ease-in-out"
            >
              Add Game
            </button>
            {showNotification && (
              <div className="dropdown-notification text-lg flex flex-col items-center justify-center mt-4">
                Game added successfully!
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdminDashboard;
