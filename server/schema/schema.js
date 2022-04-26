const { type } = require('express/lib/response');
const Comment = require('../models/commentModel')
const User = require('../models/userModel')
const Post = require('../models/postModel')
const graphql = require('graphql')


const { GraphQLObjectType, GraphQLString, GraphQLSchema , GraphQLInt, GraphQLID, GraphQLList, GraphQLNonNull} = graphql; 
 
const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: { type: GraphQLID },
        userid: { type: GraphQLID},
        img: { type: GraphQLString },
        name: { type: GraphQLString },
        comment: { type: new GraphQLList(CommentType), 
            resolve(parent, args) { 
            return Comment.find({userid: parent.id})
        }
        }
    })
});

const CommentType = new GraphQLObjectType(
    {
        name: 'Comment',
        fields: () => ({
            id: { type: GraphQLID},
            userid: { type: GraphQLID},
            Text: { type: GraphQLString},
            likes: { type: GraphQLInt}
            
        })
    }
) 

// const Mutation = new GraphQLObjectType({
//     name: 'Mutation', 
//     fields: {
//         addAuthor: {
//              type: AuthorType, 
//             args: {
//                 name: { type: new GraphQLNonNull(GraphQLString)},
//                 age: {  type: new GraphQLNonNull(GraphQLInt)}
//             },
        
//             resolve(parent, args){
             
//                 let newAuthor = new Author({
//                     name: args.name,
//                     age: args.age
//                 })
//                 return newAuthor.save()
//              }},
//         addBook: {
//             type: BookType,
//             args: {
//                 name :  { type: new GraphQLNonNull(GraphQLString)},
//                 genre: { type: new GraphQLNonNull(GraphQLString)},
//                 authorID :  { type: new GraphQLNonNull(GraphQLID)}
//             },
//             resolve(parent, args) {
//                 let newBook = new Book({ name: args.name, genre: args.genre, authorID: args.authorID })
//                 return newBook.save()
//             }
//         }
//     }
// })

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        post: {
            type: PostType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                return Post.findById(args.id)
            }
        },
        comment: {
            type: CommentType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Comment.findById(args.id)
            }
        },
        posts: { type: new GraphQLList(PostType),
        resolve(parent, args) { return Post.find({})} }
        
        , comments: { type: new GraphQLList(CommentType), resolve ( parent, args ) { return Comment.find({})}}
    },
   
});




module.exports = new graphql.GraphQLSchema({ query: RootQuery})