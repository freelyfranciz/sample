const express  = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
//import routes
const postsRoute = require('./routes/posts');

//Middleware
app.use('/posts', postsRoute);

//Routes
app.get('/', (req,res) => {
    res.send('We are on home')
});

//connect to Db 
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true}, () => {
    console.log("Connected to DB");
})

//Hows to start listening to server
app.listen(3000);