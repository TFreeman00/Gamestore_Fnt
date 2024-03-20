import React from "react";
import { useGetUsersQuery } from "../api/usersApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Users() {
  const { token } = useSelector((state) => state.authSlice);
  const { data } = useGetUsersQuery({ token });
  const { users } = useSelector((state) => state.usersSlice);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl text-center font-semibold mt-8 mb-4">All Users</h1>
      <hr className="mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-center text-lg font-semibold mb-2">ID: {user.id}</h2>
            <p className="text-gray-600 mb-2">First Name: {user.firstname}</p>
            <p className="text-gray-600 mb-2">Last Name: {user.lastname}</p>
            <p className="text-gray-600 mb-2">Email: {user.email}</p>
            <div className="flex flex-col items-center justify-center ">
            <Link
              to={`/users/${user.id}`}
              className="relative bottom-4 left-4 hover:bg-blue hover:text-white bg-transparent border border-black rounded-md px-3 py-1 transition duration-300 ease-in-out"
            >
              See Detail
            </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
