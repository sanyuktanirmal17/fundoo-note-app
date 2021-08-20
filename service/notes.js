
/***********************************************************************************************
* @description   : It is work as a middleware between models and controller
* @file          : note.js
* @author        : sanyukta
*************************************************************************************************/
const notemodel = require('../models/notes');


class NotesService {
/**
     * 
     * @param {*} noteInfo will take data for the note
     * @description : createNote is used to take data from controller then pass it to models
     */
 async createNote(noteInfo) {
try{
   return await notemodel.createNote(noteInfo);
}catch (err){
    return err;
  }
}

/**
 * @param {*} noteInfo will take data for the note to update it.
 * @description : updateNote is used to take data from controller 
 *                  then pass it to models for updating the note
 */

 updateNote = (noteData, callback) => {
    const KEY = 'note';
    notemodel.updateNote(noteData, (err, result) => {
        err ? callback(err, null) : callback(null, result);
    });
};

// updateNote = (noteID, noteData)  => {
//     console.log("noteData", noteData)
//       notemodel.updateNote(noteID, noteData)
//        .then(data => {
//            return data;
//        })
//        .catch(error =>
//         {
//             return error;
//         })
//     }      
       
     

/**
 * 
 * @description : retrieveNote is used to retrieve data for all the notes created
 */
//  retrieveNote = (callback) => {
retrieveNote = (callback) => {
try {
    notemodel.retrieveNote((err, result) => {
        err ? callback(err, null) : callback(null, result);
    });
}
catch(err){
    return err;
}
}
/**
 * ,
 * @param {*} noteIds will take the id for the note you wants to delete
 * @description : deleteNote is used to delete the note which is created earlier.
 * Promise
 */
deleteNote(noteId)  {
 try{
      return notemodel.deleteNote(noteId).then(res => {
        
        logger.info("Note deleted successfully!", noteId);
        return res
    }).catch(error => {
        logger.error("Error while deleting note by id", error);
         return error;
    })
}
 catch(error)
  {
    logger.error("Error while deleting note by id", err);
    return err;
  }
 };
}

    module.exports = new NotesService();