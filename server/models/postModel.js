const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
    {
        userid: {type: String},
        text: { type: String},
        img: { type: String},
        //HOW DO TYPESCRIPT IT TO ARRAY OF COMMENTS
        comments: { type: Array },
        date: { type: Number}
    }
)

module.exports = mongoose.model('post', postSchema)  

