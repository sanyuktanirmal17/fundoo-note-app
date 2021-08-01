const express = require("express");
 const dbconnection = require('./config/database.config');
require('dotenv');
dbconnection();

// Create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// parse requests of content-type - application/json
app.use(express.json());
// app.use(cors());

const port = process.env.PORT;

var options = {
    explorer: true
  };

// define a simple route    
app.get('/',(req,res) => {
    res.json({"message": "Welcome to Fundoo Notes App"})
})

// Require Employee routes
require('./routes/users')(app);

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port : ${port}`);
});

module.exports = app;