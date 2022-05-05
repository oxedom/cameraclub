import {  useMutation } from '@apollo/client'
import React, {useState} from 'react'
import { useSelector } from "react-redux";
import {gql} from '@apollo/client'

const CREATE_POST_MUTATION = gql`
mutation Mutation($userid: ID!, $postid: ID!, $text: String!) {
addComment(userid: $userid, postid: $postid, text: $text ) {
  userid
  postid
  text
  
}
}
`
function AddPost() {
    const { user: currentUser } = useSelector((state) => state.auth);

    const [commentState, setCommentState] = useState({
        text : "",
        id: ""
        
    })
    const [addPost,{data, loading, error}] = useMutation(CREATE_POST_MUTATION , {
        variables: {
            userid : String, 
            text: String
        
        }
      });
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    if (data) return 'yes'
    return (
    <div className='card'>
        <form onSubmit={(e)=>{e.preventDefault();addPost({variables: {userid: currentUser.id, text: commentState.text}})}}> 
            <div><input value={commentState.text} onChange={(e)=>setCommentState({...commentState,text : e.target.value})} type="text"
            placeholder="Write a Post..."/></div>
            <button type="submit">Post</button>
        </form>
    </div>
  )

}

export default AddPost