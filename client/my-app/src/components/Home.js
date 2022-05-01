import React, { useState, useEffect } from "react";
import Post from './Post'
import UserService from "../services/user.service";
import AddPost from "./AddPost";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // useQuery,
  gql
} from "@apollo/client";



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

        <Post></Post>
        {/* <AddPost></AddPost> */}
       Users: {Users.map((user)=>{return <div key={user._id}> {user.username}</div>})}
      </header>
    </div>
  );
};

export default Home;
