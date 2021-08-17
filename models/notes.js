
/*************************************************************************
 * purpose          :to save find update and delete in the database
 * @file            :note.js
 * @author          :sanyukta 
 * @version         :1.0.0
***********************************************************************/


const mongoose = require('mongoose');
const note = require('../service/notes');
/**
 * 
 * @function  noteSchema method  
 * @description Creating the notes schema. 
 * 
 */
const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  // collaboratorId: [{
  //   type: mongoose.Schema.Types.ObjectId, ref: 'User'
  // }],.;
}, {
  timestamps: true,
  versionKey: false,
});

const noteModel = mongoose.model('Note', noteSchema);
/**
 * @description created NoteModel class for note api
 */
class NotesModel {
  /**
   * 
   * @param {*} noteInfo : here we will save our data.
   * @description : createNote is used to create and save the note data.
   */
  createNote = (noteInfo, callback) => {
    const note = new noteModel({
      title: noteInfo.title,
      description: noteInfo.description,
      // userId: noteInfo.userId
    });
    note.save(callback);
  };
  /**
   * 
   * @param {*} notesID : here we will use the id to update the note.
   * @description : updateNote is used to update the note.
   */
  updateNote = (noteID, callback) => {
    noteModel.findByIdAndUpdate(noteID.noteId, {
      title: noteID.title,
      description: noteID.description,
    }, { new: true }).then((noteone) => {
      callback(null, noteone);
    }).catch((err) => {
      callback(err, null);
    });
  };
  /**
   * 
   * @param {*} callback
   * @description : here retrieveNote is used to retrieve all the notes created.
   */
  // retrieveNote = (callback) => {
    retrieveNote = (callback) => {
      noteModel.find((err, notedata) => {
        (err) ? callback(err, null) : callback(null, notedata);
      });
    };

  /**
   * 
   * @description : deleteNote is used to delete the particular note with its id.
   */
  deleteNote = (noteIds, callback) => {
    noteModel.findByIdAndRemove(noteIds, (err, noteresult) => {
      (err) ? callback(err, null) : callback(null, noteresult);
    });
  };
}

    module.exports = new NotesModel();
