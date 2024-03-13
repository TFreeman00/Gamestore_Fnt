import React from "react";
import { useGetUsersQuery } from "../api/usersApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Users() {
  const { token } = useSelector((state) => state.authSlice);
  const { data } = useGetUsersQuery({ token }); 
  const { users } = useSelector((state) => state.usersSlice); 

  return (
    <>
      <h1>All Users</h1>
      <hr />
      <div>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <h2>ID: {user.id} </h2>
              <h2>First Name: {user.firstname}</h2>
              <h2>Last Name: {user.lastname}</h2>
              <h2>Email: {user.email}</h2>
              <Link to={`/users/${user.id}`}>See Detail</Link>
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Users;
