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
        text: { type: GraphQLString },
        comments: { type: new GraphQLList(CommentType), 
            resolve(parent, args) { 
            return Comment.find({userid: parent.userid})
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
            text: { type: GraphQLString},
            likes: { type: GraphQLInt},
            postid: { type: GraphQLID}
            
        })
    }
) 

const Mutation = new GraphQLObjectType({
    name: 'Mutation', 
    fields: {
        addPost: {
             type: PostType, 
            args: {
                userid:  { type: new GraphQLNonNull(GraphQLID)},
                text:  { type: new GraphQLNonNull(GraphQLString)},
                img:  { type: new GraphQLNonNull(GraphQLString)},
                age: {  type: new GraphQLNonNull(GraphQLInt)}
            },
        
            resolve(parent, args){
             
                let newPost = new Post({
                    userid: args.userid,
                    text: args.text,
                    img: args.img,
                    comments: [],
                    date: new Date().getTime()
                })
                return newPost.save()

                .then( post => {
                    User.findByIdAndUpdate(args.userid, { $push: {"posts":  post.id}},
                        {safe: true, upsert: false}, (err,model) => {
                            if(err) { throw Error(`PROBLEM with findAndUpdate 
                            GraphQL inserting post ID in array of POSTS`)} 
                            else { console.log(`Sucesss, pushed post ID to User posts Arr (${post.id}`)} 
                            }
                         )
                        }
                      )
             }},
        addComment: {
            type: CommentType,
            args: {
                userid:  { type: new GraphQLNonNull(GraphQLID)},
                postid:  { type: new GraphQLNonNull(GraphQLID)},
                text: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let newComment = new Comment({ 
                    
                    userid: args.userid, 
                    text: args.text, 
                    likes: 0, 
                    postid: args.postid,
                    date: new Date().getTime() 

                    })

                    return newComment.save()
                    .then( comment => {
                Post.findByIdAndUpdate(args.postid, { $push: {"comments":  comment.id}},
                    {safe: true, upsert: false}, (err,model) => {
                        if(err) { throw Error(`PROBLEM with findAndUpdate 
                        GraphQL inserting comment in array of comments`)} 
                        else { console.log(`Sucesss, updated Post Comment Arr with new comment id (${comment.id}) ` )}
                    }
                    
                    )

                     })
            }
        }
    }
})

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




module.exports = new graphql.GraphQLSchema({ query: RootQuery, mutation: Mutation}, )