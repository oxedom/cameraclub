const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
    {
        userid: {type: String},
        text: { type: String},
        likes: { type: Number},
        date: { type: Number}
    }
)

module.exports = mongoose.model('comment', commentSchema)  