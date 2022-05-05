import {  useMutation } from '@apollo/client'
import React, {useState} from 'react'
import { useSelector } from "react-redux";
import Post from './Post';
import {gql} from '@apollo/client'

const CREATE_COMMENT_MUTATION = gql`
mutation Mutation($userid: ID!, $postid: ID!, $text: String!) {
addComment(userid: $userid, postid: $postid, text: $text ) {
  userid
  postid
  text
  
}
}
`
function AddComment(props) {
    const { user: currentUser } = useSelector((state) => state.auth);

    const [commentState, setCommentState] = useState({
        text : "",
        id: ""
        
    })
    const [addComment] = useMutation(CREATE_COMMENT_MUTATION , {
        variables: {
            userid : String, 
            postid : String,
            text: String
        
        }
      });

    return (
    <div>
        <form onSubmit={(e)=>{e.preventDefault();addComment({variables: {userid: currentUser.id, postid: Post.id, text: commentState.text}})}}> 
            <div><input value={commentState.text} onChange={(e)=>setCommentState({...commentState,text : e.target.value, id: props.id})} type="text"
            placeholder="Comment this Post"/></div>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default AddComment