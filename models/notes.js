
/*************************************************************************
 * purpose          :to save find update and delete in the database
 * @file            :note.js
 * @author          :sanyukta 
 * @version         :1.0.0
***********************************************************************/

const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
logger = require('../logger/logger');

const NotesSchema = new mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  title: {
      type: String
  },
  description: {
      type: String
  },
  isDeleted: {
      type: Boolean,
      default: false
  },
  labels : {
    type: [String]
  }
}, {
  // generates the time stamp the data is been added
  timestamps: true,
})

const NoteModel = mongoose.model('Notes', NotesSchema);

//created a class to write functions
class NotesModel {

  /**
   * @description function written to create notes into database
   * @param {*} a valid notesData is expected
   * @returns saved data or if error returns error
   */
  async createInfo(notesData) {
      try {
          const notes = new NoteModel({
              userId:notesData.userId,
              title: notesData.title,
              description: notesData.description
          });
          return await notes.save({});
      } catch (error) {
          return error;
      }
  }

  /**
   * @description function written to get all notes from database 
   * @returns retrieved notes or if error returns error
   */
  async getAllNotes() {
      try {
          return await NoteModel.find({});
      } catch (error) {
          return error;
      }
  }

  /**
   * @description function written to get notes by Id into database 
   * @param {*} valid notesId is expected
   * @returns notes of particular Id or if any error return error
   */
  async getNoteById(notesId) {
      try {
          return await NoteModel.findById(notesId.notesId);
      } catch (error) {
          return error;
      }
  }

// async getLabelById(labelId) {
//          try {
//              return await LabelModel.findById(labelId.labelId);
//          } catch (error) {
//              return error;
//          }
//      }

  /**
   * @description function written to update notes by Id into database 
   * @param {*} a valid notesId is expected
   * @param {*} a valid notesData is expected
   * @returns notes of particular Id or if any error return error
   */
  async updateNote(notesId, notesData) {
      try {
          return await NoteModel.findByIdAndUpdate(notesId.notesId, {
              title: notesData.title,
              description: notesData.description
          }, {new : true});
      } catch (error) {
          return error;
      }
  }

  /**
   * @description function written to update isDeleted to true
   * @param {*} notesId 
   * @param {*} notesData 
   * @returns data else if error returns error
   */
//    deleteNoteById = (notesId) => {
//     return NoteModel.findByIdAndUpdate(notesId.notesId)
//       .then((note) => {
//         logger.info("Note deleted successfully", note);
//         return note;
//       })
//       .catch((error) => {
//         logger.error("Error while deleting the note by id", error);
//         throw error;
//       });
//   };

 async deleteNote(notesId) {
    try {
        return await NoteModel.findByIdAndUpdate(notesId.notesId, {
            isDeleted: notesData.isDeleted
        }, {new: true});
    } catch (error) {
        return error;
    }
  }

  /**
     * @description function written to add label to note
     * @param {*} a valid noteId is expected
     * @param {*} a valid labelData is expected
     * @returns 
     */
   async addLabelToNote(notesId, labelData) {
    try {
        return await NoteModel.findByIdAndUpdate(notesId,
            {$push : { "labels": {$each: labelData.labelId}} },
            {new: true});
    } catch (error) {
        return error;
    }
}

/**
 * @description function written to remove label from note
 * @param {*} a valid noteId is expected
 * @param {*} a valid labelData is expected
 * @returns 
 */
async deleteLabelFromNote(notesId, labelData) {
    try {
        return await NoteModel.findByIdAndUpdate(notesId,
            {$pull : { "labels": (labelData.labelId[(0)])} },
            {new: true});
    } catch (error) {
        return error;
    }
  }
}


module.exports = new NotesModel();






