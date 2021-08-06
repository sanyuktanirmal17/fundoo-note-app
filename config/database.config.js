const mongoose = require("mongoose");
require('dotenv').config();


mongoose.Promise = global.Promise;

// Connecting to the database
function dbconnection() {
mongoose.promise;
 const CONNECTION_URL= 'mongodb://localhost:27017/fundoo-notes';
mongoose.connect(CONNECTION_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true , 
    useCreateIndex: true,  
    useFindAndModify: true 
})
return mongoose.connection
    .then(() => { console.log("Successfully connected to the database"); })
    .catch(err => { console.log('Could not connect to the database. Exiting now...', err);
                    process.exit();
    });
    
}
module.exports = dbconnection;
