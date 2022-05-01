const User = require("../models/userModel.js");
const utils = require("../lib/utlis")

//Takes in loginObj username and password
const login = (loginObj) => {
    return new Promise ((resolve, reject)=> {
    User.findOne({ username: loginObj.username }, (err, user) => {
        if(err) { 
          reject(err,console.log(err + "User not found"))}
        else {
 
          let password = toString(loginObj.password)
          let hash = user.hash
          let salt = user.salt
        const isValid = utils.validPassword(password,hash,salt);
        if (isValid) {
          
            const tokenObject = utils.issueJWT(user);
            resolve({ 
                success: true,  
                user: user, token: 
                tokenObject.token,expiresIn:
                 tokenObject.expires, },console.log(hash,salt));
          } else {

            resolve({ success: false, msg: "you have entered the wrong password" });
          }}
    })

    })
    
}

const register = (registerObj) => {

    return new Promise((resolve, reject) => {
    const password = toString(registerObj.password)
    const saltHash = utils.genPassword(password);
    console.log("salthash: "+ saltHash)
    const salt  = saltHash.salt;
    const hash = saltHash.hash;
    const date = new Date().getTime() 
      console.log(hash,salt)
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
        console.log("New User Created: " + user, user.hash, user.salt )
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