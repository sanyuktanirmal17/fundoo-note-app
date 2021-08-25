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
const redisCache = require('../middleware/redis');
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

  app.get('/notes/:notes', helper.verifyingToken, redisCache.checkCache, noteController.getAllNotes);

  app.put('/note/:notesId',  helper.verifyingToken, noteController.updateNotesById);

  app.delete('/delete/:notesId', helper.verifyingToken, noteController.deleteNotesById);

  //label CRUD api
  app.post('/createLabel/:userId',  helper.verifyingToken, labelController.createLabel);

  app.get('/labels/:labels',  helper.verifyingToken, redisCache.checkLabelCache, labelController.getAllLabels);

  app.get('/label/:labelId',  helper.verifyingToken, labelController.getLabelById);

  app.put('/updateLabel/:labelId',  helper.verifyingToken, labelController.updateLabelById);

  app.delete('/deleteLabel/:labelId',  helper.verifyingToken, labelController.deleteLabelById);

  //label to note api 
  app.put('/addLabel',  helper.verifyingToken, noteController.addLabelToNote);

  app.delete('/deleteLabel',  helper.verifyingToken, noteController.deleteLabelFromNote)

    }






















