import React, { useState } from "react";
import { useParams } from "react-router-dom";
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

  return (
    <div className="container mx-auto p-8">
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
          <button
            onClick={() => {
              window.open(game?.trailer, "_blank");
            }}
            className="relative bottom-4 left-4 hover:bg-blue hover:text-white bg-transparent border border-black rounded-md px-3 py-1 transition duration-300 ease-in-out"
          >
            Watch The Trailer
          </button>
          <button
            id={data?.id}
            data-target-id={data?.id}
            data-target-title={data?.title}
            data-target-image={data?.image}
            data-target-price={data?.price}
            onClick={(e) => {
              return !token
              ? cartSession(e)
              : addToCart({
                productid: Number(e.target.dataset.targetId),
                token,
              });
            }}
            className="relative bottom-4 left-4 hover:bg-blue hover:text-white bg-transparent border border-black rounded-md px-3 py-1 transition duration-300 ease-in-out"
            >
            Add to Cart
          </button>
        </div>
        <div>
        {users && users.isadmin && (
          <div className="form-container sm:col-span-2 lg:col-span-1">
            <form onSubmit={submitForm} className="form">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={updateForm}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <input
                  type="text"
                  name="genre"
                  id="genre"
                  onChange={updateForm}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="first_release_date">Release Date</label>
                <input
                  type="text"
                  name="first_release_date"
                  id="first_release_date"
                  onChange={updateForm}
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  onChange={updateForm}
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  onChange={updateForm}
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="trailer">Trailer</label>
                <input
                  type="text"
                  name="trailer"
                  id="trailer"
                  onChange={updateForm}
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  onChange={updateForm}
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="platform">Platform</label>
                <input
                  type="text"
                  name="platform"
                  id="platform"
                  onChange={updateForm}
                  className="form-input"
                />
              </div>
              {/* Other form fields */}
              <button
                className="relative bottom-4 left-4 hover:bg-blue hover:text-white bg-transparent border border-black rounded-md px-4 py-1 transition duration-300 ease-in-out"
                onClick={submitForm}
              >
                Save
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

