
/***********************************************************************************************
* @description   : It is work as a middleware between models and controller
* @file          : note.js
* @author        : sanyukta
*************************************************************************************************/


const notesModel = require('../models/notes');
logger = require('../logger/logger');

class NotesService {
    /**
     * @description this function is written to send data models
     * @param {*} A valid notesData is expected
     * @returns error if it has error else data
     */
    async createNotes(notesData) {
        try {
            return await notesModel.createInfo(notesData);
        } catch (error) {
            return error;
        }
    }

    /**
     * @description this function is written to trigger or call the models function
     * @returns error if it has error else data
     */
    async getAllNotes() {
        try {
            return await notesModel.getAllNotes();
        } catch (error) {
            return error;
        }
    }



    async getNoteById(notesId) {
        try {
            return await notesModel.getNoteById(notesId);
        } catch (error) {
            return error;
        }
    }

    /**
     * @description this function is written to trigger or call the models function
     * @param {*} notesId 
     * @param {*} notesData 
     * @returns error if it has error else data
     */
    async updateNotesById(notesId, notesData) {
        try {
            return await notesModel.updateNote(notesId, notesData);
        } catch (error) {
            return error;
        }
    }

    /**
     * @description deleting notes by id
     * @param {*} notesId 
     * @returns 
     */

    // deleteNoteById = (notesId) => {
    //   return new Promise(function (resolve, reject) {
    //     try {
    //       notesModel.deleteNoteById(notesId)
    //         .then((note) => {
    //           logger.info("Note deleted successfully!", note);
    //           resolve(note);
    //         })
    //         .catch((error) => {
    //           logger.error("Error while deleting note by id", error);
    //           reject(error);
    //         });
    //     } catch (err) {
    //       logger.error("Error while deleting note by id", err);
    //       reject(err);
    //     }
    //   });
    // };
    
     async deleteNoteById(notesId, notesData) {
      try {
          return await notesModel.deleteNote(notesId, notesData);
      } catch (error) {
          return error
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
        return await notesModel.addLabelToNote(notesId, labelData);
    } catch (error) {
        return error
    }
}

/**
 * @description function written to delete label from note
 * @param {*} a valid noteId is expected
 * @param {*} a valid labelData is expected
 * @returns 
 */
async deleteLabelFromNote(notesId, labelData) {
    try {
        return await notesModel.deleteLabelFromNote(notesId, labelData);
    } catch (error) {
        return error
    }
  }
}

//exporting the class to utilize or call function created in this class
module.exports = new NotesService();

// const notemodel = require('../models/notes');


// class NotesService {
// /**
//      * 
//      * @param {*} noteInfo will take data for the note
//      * @description : createNote is used to take data from controller then pass it to models
//      */
//  async createNote(noteInfo) {
// try{
//    return await notemodel.createNote(noteInfo);
// }catch (err){
//     return err;
//   }
// }

// /**
//  * @param {*} noteInfo will take data for the note to update it.
//  * @description : updateNote is used to take data from controller 
//  *                  then pass it to models for updating the note
//  */

//  updateNote = (noteData, callback) => {
//     const KEY = 'note';
//     notemodel.updateNote(noteData, (err, result) => {
//         err ? callback(err, null) : callback(null, result);
//     });
// };

// // updateNote = (noteID, noteData)  => {
// //     console.log("noteData", noteData)
// //       notemodel.updateNote(noteID, noteData)
// //        .then(data => {
// //            return data;
// //        })
// //        .catch(error =>
// //         {
// //             return error;
// //         })
// //     }      
       
     

// /**
//  * 
//  * @description : retrieveNote is used to retrieve data for all the notes created
//  */
// //  retrieveNote = (callback) => {
// retrieveNote = (callback) => {
// try {
//     notemodel.retrieveNote((err, result) => {
//         err ? callback(err, null) : callback(null, result);
//     });
// }
// catch(err){
//     return err;
// }
// }
// /**
//  * ,
//  * @param {*} noteIds will take the id for the note you wants to delete
//  * @description : deleteNote is used to delete the note which is created earlier.
//  * Promise
//  */
// deleteNote(noteId)  {
//  try{
//       return notemodel.deleteNote(noteId).then(res => {
        
//         logger.info("Note deleted successfully!", noteId);
//         return res
//     }).catch(error => {
//         logger.error("Error while deleting note by id", error);
//          return error;
//     })
// }
//  catch(error)
//   {
//     logger.error("Error while deleting note by id", err);
//     return err;
//   }
//  };

//  /**
//      * 
//      * @param {*} data : data comes from the body.
//      * @description : addLabelToNote is used to add labels into existing note,
//      *               its taking data from controller and passing it to models
//      */
//   addLabelToNote = (data, callback) => {
//     try {
//     notemodel.addLabelToNote(data, callback);
// }
// catch (error) {
//     return error;
// }
//   }

// }

//     module.exports = new NotesService();