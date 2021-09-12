
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


module.exports = new NotesService();

