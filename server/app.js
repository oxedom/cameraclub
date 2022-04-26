const mongoose = require('mongoose')
const express = require('express')
const port = 4000
const app = express()
const cors = require('cors')
const config = require('./config/config')
const user_routes = require('./routers/users')

// const post_routes = require('./Routers/posts')

//KEVINS WORK
// const session = require("express-session");
// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;


const path = require('path');


require('dotenv').config();



mongoose.connect(config, { useUnifiedTopology: true, useNewUrlParser: true } )
.then( (result) => { app.listen(port, console.log(`Server is Online PORT ${port}`))})
const db = mongoose.connection 
db.on("error", console.error.bind(console, "mongo connection error"))

//KEVINS WORK
// require('./Config/passport')(passport);




app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/user/', user_routes)
