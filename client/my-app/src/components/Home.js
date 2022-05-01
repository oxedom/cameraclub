import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setUsers(response.data)
        ;
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setUsers(_content);
      }
    );
  });

  return (
    <div className="container">
      <header className="jumbotron">
       Users: {Users.map((user)=>{return <div key={user._id}> {user.username}</div>})}
      </header>
    </div>
  );
};

export default Home;
