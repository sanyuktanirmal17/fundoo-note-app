/**
 * 
 * @module       Model
 * @file         user.js
 * @description  API Routing
 * @author       Sanyukta
 * @since        29/7/2021 
********************************************************************/
const helper = require("../middleware/helper");
const controller = require('../controllers/user');
const note= require('../controllers/notes');
// const LabelController = require('../controllers/label');
const noteController = require('../controllers/notes');
const labelController = require('../controllers/label');
module.exports = (app) => {
    
    //api for registration
    app.post('/register',controller.register);

    //api for login
    app.post('/login', controller.login);

    //api for forget pasword
     app.post('/forgotPassword', controller.forgotPassword);

     //api for Reset pasword
     app.put('/resetPassword', controller.resetPassword);

   
  //notes CRUD api
  app.post('/createNotes', helper.verifyingToken, noteController.createNotes);

  app.get('/notes/:notes', helper.verifyingToken, noteController.getAllNotes);

  app.put('/note/:notesId',  helper.verifyingToken, noteController.updateNotesById);

  app.delete('/delete/:notesId', helper.verifyingToken, noteController.deleteNotesById);

  //label CRUD api
  app.post('/createLabel/:userId',  helper.verifyingToken, labelController.createLabel);

  app.get('/labels/:labels',  helper.verifyingToken, labelController.getAllLabels);

  app.get('/label/:labelId',  helper.verifyingToken, labelController.getLabelById);

  app.put('/updateLabel/:labelId',  helper.verifyingToken, labelController.updateLabelById);

  app.delete('/deleteLabel/:labelId',  helper.verifyingToken, labelController.deleteLabelById);

  //label to note api 
  app.put('/addLabel',  helper.verifyingToken, noteController.addLabelToNote);

  app.delete('/deleteLabel',  helper.verifyingToken, noteController.deleteLabelFromNote);

 

    //  // CRUD  for Notes
    //  app.post('/notes', helper.verifyingToken, note.createNote);

    //  app.put('/notes/:noteId', helper.verifyingToken, note.updateNote);
 
    //  app.get('/notes', helper.verifyingToken,  note.retrieveNote);
 
    //  app.delete('/notes/:noteId', helper.verifyingToken, note.deleteNote);
    
    //  app.post('/addLabelToNote', helper.verifyingToken, note.addLabelToNote)
    //  //  label CRUD operation

    //  app.post('/label', helper.verifyToken, LabelController.createLabel);

    // app.put('/label/:labelId', helper.verifyToken, LabelController.updateLabel);

    // app.get('/label', helper.verifyToken, LabelController.retrieveLabels);

    // app.delete('/label/:labelId', helper.verifyToken, LabelController.deleteLabel);

    }






















