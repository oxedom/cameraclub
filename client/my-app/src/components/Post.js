//Apollo Import
import {
    ApolloClient,
    InMemoryCache,
    // ApolloProvider,
    // useQuery,
    gql
  } from "@apollo/client";




const Post = () => {

    const client = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: new InMemoryCache()
      });

    client
    .query({
      query: gql`
      query{
        posts {
          id
          text
        } 
        }
        
      `
    })
    .then(result => console.log(result))


    return (<div>   

    </div>  );
}
 
export default Post ;

