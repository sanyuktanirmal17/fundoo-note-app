const express = require("express");
 const dbconnection = require('./config/database.config');
const logger = require("./logger/logger")
 require('dotenv');
dbconnection();
const bodyParser = require("body-parser")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({extended: true}));

// parse requests of content-type - application/json
// app.use(express.json());
  app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({extended: true,}));

const port = process.env.PORT;

var options = {
    explorer: true
  };

// swagger ui
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// define a simple route    
app.get('/',(req,res) => {
    res.json({"message": "Welcome to Fundoo Notes App"})
})

// Require user routes
require('./routes/users')(app);

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port : ${port}`);
    logger.log(`info`,`Server is listening on port : ${port}`);
});

module.exports = app;