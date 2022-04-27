const User = require("../models/userModel.js");
const passport = require("passport");
const utils = require("../lib/utlis")

const login = (loginObj) => {
    return new Promise ((resolve, reject)=> {
    User.findOne({ username: loginObj.username }, (err, user) => {
        if(err) { reject(err)}
        else {
        const isValid = utils.validPassword(loginObj.password,user.hash, user.salt);
        
        if (isValid) {
            const tokenObject = utils.issueJWT(user);
            resolve({ 
                success: true,  
                user: user, token: 
                tokenObject.token,expiresIn:
                 tokenObject.expires, });
          } else {
            resolve({ success: false, msg: "you have entered the wrong password" });
          }}
    })
    .catch((err) => {
      next(err);
    });

    })
    
}

const register = (registerObj) => {

    return new Promise((resolve, reject) => {

    const saltHash = utils.genPassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const date = new Date().getTime() 

    const newUser = new User({
      username: req.body.username,
      hash: hash,
      salt: salt,
      email: req.body.email,
      birthday: req.body.birthday,
      accountCreation: date,
    });
  
    try {
      newUser.save().then((user) => {
        const jwt = utils.issueJWT(user);
        //KEVIN LOOK AT THIS
        resolve({
          success: true,
          user: user,
          token: jwt.token,
          expiresIn: jwt.expires,
        });
      });
    } catch (err) {
             //KEVIN LOOK AT THIS
      reject(err)
    }
     })

}

module.exports = { login, register};