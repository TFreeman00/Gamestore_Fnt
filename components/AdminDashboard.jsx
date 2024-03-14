import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetUsersQuery } from "../api/usersApi"; // Import the hook for fetching user data
import { useCreateGameMutation } from "../api/gamesApi";
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [createGame] = useCreateGameMutation();
  const games = useSelector((state) => state.gameSlice.games);
  //const { data: currentUser } = useGetUsersQuery();
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
    platform: "",
  });
  const updateForm = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const submitForm = async (e) => {
    e.preventDefault();
    const result = await createGame({
      ...formData,
      token,
      price: Number(formData.price),
    });
    console.log(result);
  };
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 5;
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
    <>
      ADMIN
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" onChange={updateForm} />
        </div>
        <div>
          <label htmlFor="genre">Genre</label>
          <input type="text" name="genre" id="genre" onChange={updateForm} />
        </div>
        <div>
          <label htmlFor="first_release_date">first_release_date</label>
          <input
            type="text"
            name="first_release_date"
            id="first_release_date"
            onChange={updateForm}
          />
        </div>
        <div>
          <label htmlFor="image">image</label>
          <input type="text" name="image" id="image" onChange={updateForm} />
        </div>
        <div>
          <label htmlFor="price">price</label>
          <input type="text" name="price" id="price" onChange={updateForm} />
        </div>
        <div>
          <label htmlFor="trailer">trailer</label>
          <input
            type="text"
            name="trailer"
            id="trailer"
            onChange={updateForm}
          />
        </div>
        <div>
          <label htmlFor="description">description</label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={updateForm}
          />
        </div>
        <div>
          <label htmlFor="platform">platform</label>
          <input
            type="text"
            name="platform"
            id="platform"
            onChange={updateForm}
          />
        </div>
        <button onClick={submitForm}>Add Game</button>
      </form>
    </>
  );
};
export default AdminDashboard;
