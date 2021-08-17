/**
 * 
 * @module       Model
 * @file         user.js
 * @description  API Routing
 * @author       Sanyukta
 * @since        29/7/2021 
********************************************************************/

// const { verifyingToken, redisMiddleWare } = require('../utility/user');
const helper = require("../middleware/helper");
const controller = require('../controllers/user');
const note= require('../controllers/notes');
// const { required } = require("joi");
module.exports = (app) => {
    
    //api for registration
    app.post('/register',controller.register);

    //api for login
    app.post('/login', controller.login);

    //api for forget pasword
     app.post('/forgotPassword', controller.forgotPassword);

     //api for Reset pasword
     app.put('/resetPassword', controller.resetPassword);

     // CRUD 
     app.post('/notes', helper.verifyToken, note.createNote);

     app.put('/notes/:noteId', helper.verifyToken, note.updateNote);
 
     app.get('/notes', helper.verifyToken, helper.redisMiddleWare, note.retrieveNote);
 
     app.delete('/notes/:noteId', helper.verifyToken, note.deleteNote);
    }






















