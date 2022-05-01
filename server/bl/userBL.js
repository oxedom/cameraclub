const { log } = require("console");
const { Hash } = require("crypto");
const User = require("../models/userModel");

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, data) => {
      if (err) {
        reject(err);
      } else {
         let resp = data 
         
        //  delete resp.hash
        //   delete resp.salt 
        //   resp.username = "DEBUG"
        //   console.log(data)
        //   console.log(resp);
        // resolve(resp)

        //fix this
        data.hash = ""
        data.salt = ""
        resolve(data);
      }
    });
  });
};

const updateUserById = (id, obj) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, obj, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("User Updated");
      }
    });
  });
};

const deleteUserById = (id) => {
    return new Promise((resolve,reject)=>{
        User.findByIdAndDelete(id,(err)=>{
            if (err){
                reject (err)
            }
            else {
                resolve ("User Removed")
            }
        })
    })
}

module.exports = { getAllUsers, getUserById, updateUserById, deleteUserById };
