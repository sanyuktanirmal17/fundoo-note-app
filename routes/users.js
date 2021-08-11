/**
 * 
 * @module       Model
 * @file         user.js
 * @description  API Routing
 * @author       Sanyukta
 * @since        29/7/2021 
********************************************************************/
const logger = require("../logger/logger");

const controller = require('../controllers/user')
module.exports = (app) => {
    
    //api for registration
    app.post('/register',controller.register);

    //api for login
    app.post('/login', controller.login);

    //api for forget pasword
     app.post('/forgotPassword', controller.forgotPassword);
}






















