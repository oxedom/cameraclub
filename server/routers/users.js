const express = require("express");
const userBL = require("../bl/userBL");
const authBL = require("../bl/authBL")
const router = express.Router();
const User = require("../models/userModel.js");
const passport = require("passport");
const utils = require("../lib/utlis")

router.get( "/protected",passport.authenticate("jwt", { session: false }),(req, res, next) => 
{
  //THIS LOGIC NEEDS TO BE IN BL
  //let data = await logic.getProtected
  //return res.json(data)
    res.status(200).json({
      success: true,
      msg: "You are successfully authenticated to this route!",
    });
    if (err) {
      next(err);
    }
  }
);

// Validate an existing user and issue a JWT
router.post("/login", function (req, res, next) {

  let data = await logic.login(req.body)
  return res.json(data)
  
});

// Register a new subscriber
router.post("/register", function (req, res, next) {
    //THIS LOGIC NEEDS TO BE IN BL
  let data = await logic.register(req.body)
  return res.json(data)

  
});

router.get("/",passport.authenticate("jwt", { session: false }), async function (req, resp) {
    let data = await userBL.getAllUsers();
    return resp.json(data);
  }
);

//GET get user info by ID
router.get("/:id",passport.authenticate("jwt", { session: false }), async function (req, resp) {
    let id = req.params.id;
    let data = await userBL.getUserById(id);
    return resp.json(data);
  }
);

//PUT update user info with ID and userObj 
router.put("/:id", passport.authenticate("jwt", { session: false }),async (req, res) => {
    let id = req.params.id;
    let UserObj = req.body;
    let status = await userBL.updateUserById(id, UserObj);
    return res.json(status);
  }
);

//DELETE delete user by ID
router.delete("/:id", passport.authenticate("jwt", { session: false }),async function (req, resp) {
    let id = req.params.id;
    let status = await userBL.deleteUserById(id);
    return resp.json(status);
  }
);

module.exports = router;
