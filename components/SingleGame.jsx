import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetGameByIdQuery, useUpdateGameMutation } from "../api/gamesApi";
import { useAddToCartMutation } from "../api/cartApi";
function SingleGame() {
  const { id } = useParams();
  const [updateGame] = useUpdateGameMutation();
  const [addToCart] = useAddToCartMutation();
  const { data } = useGetGameByIdQuery(id);
  const { game } = useSelector((state) => state.gameSlice);
  const { users, token } = useSelector((state) => state.authSlice);
  const [showNotification, setShowNotification] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [formData, setFormData] = useState({
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
    const result = await updateGame({
      ...formData,
      id: game.id,
      price: Number(formData.price),
    });
    console.log(result);
  };
  const cartSession = (e) => {
    if (window.sessionStorage.cart) {
      //get cart
      const cart = JSON.parse(window.sessionStorage.cart);
      //add item into cart
      cart.push({
        id: e.target.dataset.targetId,
        title: e.target.dataset.targetTitle,
        url: e.target.dataset.targetImage,
        price: e.target.dataset.targetPrice,
      });
      //update cart with new item
      window.sessionStorage.setItem("cart", JSON.stringify(cart));
    } else {
      //create cart
      window.sessionStorage.setItem(
        "cart",
        JSON.stringify([
          {
            id: e.target.dataset.targetId,
            title: e.target.dataset.targetTitle,
            url: e.target.dataset.targetImage,
            price: e.target.dataset.targetPrice,
          },
        ])
      );
    }
  };
  const navigate = useNavigate();
  const handleAddToCart = () => {
    if (!token) {
      setShowLoginPopup(true);
    } else {
      addToCart({
        productid: Number(data?.id),
        token,
      })
        .then(() => {
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    }
  };
  return (
    <div className="container mx-auto p-8  flex items-center justify-center">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative bg-white shadow-md rounded-lg p-4">
          <img
            src={game?.image || data?.image}
            alt={game?.title || data?.title}
            className="w-full h-52 object-cover mb-4 rounded-lg"
          />
          <h1 className="text-xl font-semibold mb-2">
            {game?.title || data?.title}
          </h1>
          <h2 className="text-gray-600 mb-2">${game?.price || data?.price}</h2>
          <p className="text-gray-500 mb-4">
            {game?.description || data?.description}
          </p>
          <h2 className="text-gray-600 mb-2">
            Genre: {game?.genre || data?.genre}
          </h2>
          <h2 className="text-gray-600 mb-2">
            Platform: {game?.platform || data?.platform}
          </h2>
          <h2 className="text-gray-600 mb-2">
            First Release Date:{" "}
            {game?.first_release_date || data?.first_release_date}
          </h2>
          <iframe
            width="560"
            height="315"
            src={game?.trailer}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          >
            Watch the Tailer
          </iframe>
          <button
            onClick={handleAddToCart}
            className="relative bottom-4 left-4 hover:bg-blue hover:text-white bg-transparent border border-black rounded-md px-3 py-1 transition duration-300 ease-in-out"
          >
            Add to Cart
          </button>
          {showNotification && (
            <div className="dropdown-notification">Item added to cart</div>
          )}
          {/* Login popup */}
          {showLoginPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 ">
              <div className="max-w-md w-full mx-4 md:mx-auto p-8 justify-center bg-white shadow-md rounded-lg">
                <h2 className="text-center text-xl font-semibold mb-4">
                  Please log in or register
                </h2>
                <div className="flex justify-center mb-4">
                  <button
                    onClick={() => {
                      navigate("/auth/login");
                    }}
                    className="relative bottom-4 left-4 hover:bg-blue hover:text-white bg-transparent border border-black rounded-md px-3 py-1 transition duration-300 text-lg ease-in-out"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      navigate("/auth/register");
                    }}
                    className=" ml-2 relative bottom-4 left-4 hover:bg-blue hover:text-white bg-transparent border border-black rounded-md px-3 py-1 transition duration-300 text-lg ease-in-out"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {users && users.isadmin && (
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold mb-8 text-center">Edit Game</h1>
              <form onSubmit={submitForm} className="mb-8">
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
                <button
                  type="submit"
                  className="mr-4 frelative bottom-4 left-4 hover:bg-blue hover:text-white bg-transparent border border-black rounded-md px-3 py-1 transition duration-300 ease-in-out"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="frelative bottom-4 left-4 hover:bg-blue hover:text-white bg-transparent border border-black rounded-md px-3 py-1 transition duration-300 ease-in-out"
                  onClick={() => setFormData({})}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default SingleGame;
