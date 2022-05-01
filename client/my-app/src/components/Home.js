import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import AddPost from "./AddPost";

const Home = () => {
  const [content, setContent] = useState("");
  client
  .query({
    query: gql`
    query{
      posts {
        id
        text
      } 
      }  `
  })
  .then(result => console.log(result))
  
  
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
        <h3>{content}</h3>
        <Post> </Post>
        <AddPost></AddPost>
       Users: {Users.map((user)=>{return <div key={user._id}> {user.username}</div>})}
      </header>
    </div>
  );
};

export default Home;
