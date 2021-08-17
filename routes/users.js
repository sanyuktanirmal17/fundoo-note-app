/**
 * 
 * @module       Model
 * @file         user.js
 * @description  API Routing
 * @author       Sanyukta
 * @since        29/7/2021 
********************************************************************/
const helper = require("../utility/user");
const controller = require('../controllers/user');
const note= require('../controllers/notes');

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
     app.post('/notes', helper.verifyingToken, note.createNote);

     app.put('/notes/:noteId', helper.verifyingToken, note.updateNote);
 
     app.get('/notes', helper.verifyingToken,  note.retrieveNote);
 
     app.delete('/notes/:noteId', helper.verifyingToken, note.deleteNote);
    }






















