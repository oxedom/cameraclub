import { useMutation,gql } from "@apollo/client";



const GET_ALLPOST = gql`
  query {
    posts{
        id
        text
        userid
        img
        }
    comments{
      	id
        userid
        postid
        text
        likes
    }
    
}` 




export default GET_ALLPOST