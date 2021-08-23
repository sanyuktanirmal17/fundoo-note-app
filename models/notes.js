
/*************************************************************************
 * purpose          :to save find update and delete in the database
 * @file            :note.js
 * @author          :sanyukta 
 * @version         :1.0.0
***********************************************************************/


const mongoose = require('mongoose');
// const { error } = require('../logger/logger');
logger = require('../logger/logger');

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
  async createNote(noteInfo)  {
    try {
    const note = new noteModel({
      title: noteInfo.title,
      description: noteInfo.description,
      // userId: noteInfo.userId
    });
    return await note.save({});
  } catch (error) {
    return error;
}
}
  
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
  

  // updateNote = (noteID, noteData) => {
  //    noteModel.findByIdAndUpdate(noteID, {
  //     title: noteData.title,
  //     description: noteData.description
  //     },{new: true}).then(res =>{
  //       console.log(res);
  //         return res;
  //       }).catch(err =>
  //         {
  //           return  err;
  //         }
  //    )
  //   }
    
    
  
  /**
   * 
   * @param {*} callback
   * @description : here retrieveNote is used to retrieve all the notes created.
   */
    retrieveNote = (callback) => {
      try {
      noteModel.find((err, notedata) => {
        (err) ? callback(err, null) : callback(null, notedata);
      });
    }
      catch (err){
        return err;
      }
    };

  
  /**
   *@description : deleteNote is used to delete the particular note with its id.
   * @param {*} noteId 
   * @returns  
   * Promise
   */

deleteNote(noteId) {
  try {
    return noteModel.findByIdAndRemove(noteId.noteId)
    .then(res => {
      logger.info("Note deleted successfully", note);
      return res}).catch(error => {
        return error;
      })
    }
    catch(error){
      logger.error("Error while deleting the note by id", error);
      return error;
    };
  }

  /**
   * 
   * @param {*} data 
   * @returns {*} callback 
   * @description : addLabelToNote will add the label to note in array.
   */
   addLabelToNote = async (data, callback) => {
    try {
    const result = await noteModel.findByIdAndUpdate(data.noteId, {
      $push: {
        labelId: data.labelId
      }
    });
    callback(null, result);
  }
  catch (error) {
    return error;
}
   }
  
}
    module.exports = new NotesModel();
