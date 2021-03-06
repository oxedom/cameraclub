const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  email: { type: String },
  birthday: Number,
  posts: { type: Array, postID: String },
  hash:  String,
  salt:  String,
  accountCreation: Number,
});

module.exports = mongoose.model("user", userSchema);

// user {
//     user
//     id:  string
//     username: string
//     email:  string
//     date of birth: UNIX INT
//     hash :string
//     salt : string
//     postArr [ FK, FK , FK , FK ] }
