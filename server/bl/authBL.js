const User = require("../models/userModel.js");
const utils = require("../lib/utlis")

//Takes in loginObj username and password
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

    const saltHash = utils.genPassword(registerObj.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const date = new Date().getTime() 

    const newUser = new User({
      username: registerObj.username,
      hash: hash,
      salt: salt,
      email: registerObj.email,
      birthday: registerObj.birthday,
      accountCreation: date,
    });
  
    try {
      newUser.save().then((user) => {
        const jwt = utils.issueJWT(user);
   
        resolve({
          success: true,
          user: user,
          token: jwt.token,
          expiresIn: jwt.expires,
        });
      });
    } catch (err) { reject(err) }
     })

}





module.exports = { login, register};