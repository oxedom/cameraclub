const mongoose = require('mongoose')
const express = require('express')
const port = 4000
const app = express()
const cors = require('cors')
const schema = require('./schema/schema')
const config = require('./config/config')
const user_routes = require('./routers/users')
const { graphqlHTTP } = require('express-graphql');
const { graphql } = require('graphql')
const passport = require("passport");
const path = require('path');
require('./models/userModel')
require('./config/passport')(passport);
mongoose.connect(config, { useUnifiedTopology: true, useNewUrlParser: true } )
.then( (result) => { app.listen(port, console.log(`Server is Online PORT ${port}`))})
const db = mongoose.connection 
db.on("error", console.error.bind(console, "mongo connection error"))

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/user/', user_routes)
app.use('/graphql', graphqlHTTP({ schema, graphiql: true}));
