import React from "react";
import GET_ALLPOST from "../services/post.service";
import { useQuery } from "@apollo/client";

function Post() {
  const { loading, error, data } = useQuery(GET_ALLPOST);
  if (loading) return <p>{loading}</p>;
  if (error) return <p>{error} </p>;

  return (
    <div>
      {data.posts.map((Post) => {
        return (
          <div key={Post.id}>
            {Post.text}: {Post.likes} 0
            Post ID : {Post.id} + USER ID :{Post.userid}
            <div>
              {data.comments
                .filter((comment) => comment.postid === Post.id)
                .map((comment) => {
                  return <div key={comment.postid}>COMMENT : {comment.text}<div>LIKE 0 {comment.like}</div></div>;
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Post;