const notemodel = require('../models/notes');
const { redisFunction } = require('../middleware/helper');

class NotesService {
/**
     * 
     * @param {*} noteInfo will take data for the note
     * @description : createNote is used to take data from controller then pass it to models
     */
 createNote = (noteInfo, callback) => {
    notemodel.createNote(noteInfo, callback);
};
/**
 * 
 * @param {*} noteInfo will take data for the note to update it.
 * @description : updateNote is used to take data from controller 
 *                  then pass it to models for updating the note
 */
updateNote = (noteData, callback) => {
    const KEY = 'note';
    notemodel.updateNote(noteData, (err, result) => {
        err ? callback(err, null) : redisFunction(KEY, result), callback(null, result);
    });
};
/**
 * 
 * @description : retrieveNote is used to retrieve data for all the notes created
 */
retrieveNote = (callback) => {
    notemodel.retrieveNote((err, result) => {
        err ? callback(err, null) : callback(null, result);
    });
}
/**
 * 
 * @param {*} noteIds will take the id for the note you wants to delete
 * @description : deleteNote is used to delete the note which is created earlier.
 */
deleteNote = (noteIds, callback) => {
    notemodel.deleteNote(noteIds, callback);
};
}

    module.exports = new NotesService();