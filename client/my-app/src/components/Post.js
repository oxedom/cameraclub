import React, { useState, useEffect} from "react";
import GET_ALLPOST from "../services/post.service";
import { useQuery } from "@apollo/client";
import { CSSProperties } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UserService from "../services/user.service";
import AddComment from './AddComment'

function Post() {

const [Users, setUsers] = useState([])
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
    
  const { loading, error, data } = useQuery(GET_ALLPOST);
  if (loading) return <p>{loading}</p>;
  if (error) return <p>{error} </p>;

  
  
  return (
    <div className="mainPost">
      {data.posts.map((Post) => {
        return (
          <Card sx={{ maxWidth: 345, paddingTop: 1, marginBottom: 2 }} key={Post.id}>
              <div>{Users.filter(User => User.id || User._id === Post.userid).map((User)=>{return <p key={Post.userid}>{User.username}{console.log({User})}</p>})} </div>
            {Post.text}: {Post.likes} 0
            Post ID : {Post.id} + USER ID :{Post.userid}
            <div>
              {data.comments
                .filter((comment) => comment.postid === Post.id).filter((comment, index)=> index < 4)
                .map((comment,index) => {
                  return <div className="postComment" key={index}>COMMENT : {comment.text}<div className="postLike" >LIKE 0 {comment.like}</div></div>;
                })}
            </div>
            <AddComment sx={{marginBottom: 2, marginTop: 2, minHeight: 50}}></AddComment>
          </Card>
        );
      })}
    </div>
  );
}

export default Post;
