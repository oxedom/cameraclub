const { type } = require('express/lib/response');
const graphql = require('graphql')
const Book = require('../models/bookSchema')
const Author = require('../models/authorSchema')

const { GraphQLObjectType, GraphQLString, GraphQLSchema , GraphQLInt, GraphQLID, GraphQLList, GraphQLNonNull} = graphql; 


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: { 
            type: new GraphQLList(BookType),
            resolve(parent ,args) {
                return Book.find({authorID: parent.id})
            }
        }
    })
});

const BookType = new GraphQLObjectType(
    {
        name: 'Book',
        fields: () => ({
            id: { type: GraphQLString},
            name: { type: GraphQLString},
            genre: { type: GraphQLString},
            author: { type: AuthorType,
            resolve(parent,args) {
             return Author.findById(parent.authorID)
            }
        }
        })
    }
) 

const Mutation = new GraphQLObjectType({
    name: 'Mutation', 
    fields: {
        addAuthor: {
             type: AuthorType, 
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)},
                age: {  type: new GraphQLNonNull(GraphQLInt)}
            },
        
            resolve(parent, args){
             
                let newAuthor = new Author({
                    name: args.name,
                    age: args.age
                })
                return newAuthor.save()
             }},
        addBook: {
            type: BookType,
            args: {
                name :  { type: new GraphQLNonNull(GraphQLString)},
                genre: { type: new GraphQLNonNull(GraphQLString)},
                authorID :  { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let newBook = new Book({ name: args.name, genre: args.genre, authorID: args.authorID })
                return newBook.save()
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Author.findById(args.id)
            }
        },
        books: { type: new GraphQLList(BookType),
        resolve(parent, args) { return Book.find({})} }
        
        , authors: { type: new GraphQLList(AuthorType), resolve ( parent, args ) { return Author.find({})}}
    },
   
});




module.exports = new graphql.GraphQLSchema({ query: RootQuery, mutation: Mutation})