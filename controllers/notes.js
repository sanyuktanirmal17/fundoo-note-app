/********************************************************************************************************
 * @description   : It is use to taking the request from the client and gives the response and
 *                  validating whether the input is correct or not.
 * @file          : user.js
 * @author        : sanyukta
********************************************************************************************************/

const notesService = require('../service/notes');
const {notesCreationValidation, addingRemovingLabelValidation} = require('../middleware/user');
logger = require('../logger/logger');
const redisClass = require('../middleware/redis')
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT);
const {verifyTokenUser} = require('../middleware/helper');

class NotesController {
    /**
     * @description function written to create notes into the database
     * @param {*} a valid req body is expected
     * @param {*} res 
     * @returns response
     */
    async createNotes(req, res) {
        try {
            let dataValidation = notesCreationValidation.validate(req.body);
            if (dataValidation.error) {
                return res.status(400).send({
                    message: dataValidation.error.details[0].message
                });
            }
            const tokenData = verifyTokenUser(req.headers.token);
            const notesData = {
                // userId: tokenData.tokenUser.userId,
                title: req.body.title,
                description: req.body.description
            }
            const notesCreated = await notesService.createNotes(notesData);
            res.send({success: true, message: "Notes Created!", data: notesCreated});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while creating notes" });
        }
    }

    /**
     * @description function written to get all the notes from the database
     * @param {*} req 
     * @param {*} res 
     * @returns response
     */
    async getAllNotes(req, res) {
        try {
            const getNotes = req.params;
            const getAllNotes = await notesService.getAllNotes();
            const data = await JSON.stringify(getAllNotes);
            redisClass.setDataInCache(getNotes.notes, 3600, data)
            res.send({success: true, message: "Notes Retrieved!", data: getAllNotes});
            // console.log("controller found", data);
        } catch (error) {
            console.log("controller not found",error);
            res.status(500).send({success: false, message: "Some error occurred while retrieving notes"});
        }
    }

    async getNoteById(req, res) {
        try {
            let notesId = req.params;
            const getNotes = await notesService.getNoteById(notesId);
            redisClass.setDataInCache(getNotes.notes, 3600, data)
            res.send({success: true, message: "Note Retrieved!", data: getNotes});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while retrieving Note"});
        }
    }


    /**
     * @description function written to update notes using ID from the database
     * @param {*} req 
     * @param {*} res 
     * @returns response
     */
    async updateNotesById(req, res) {
        try {
            let dataValidation = notesCreationValidation.validate(req.body);
            if (dataValidation.error) {
                return res.status(400).send({
                    message: dataValidation.error.details[0].message
                });
            }

            let notesId = req.params;
            const notesData = {
                title: req.body.title,
                description: req.body.description
            }
            const updateNote = await notesService.updateNotesById(notesId, notesData);
            res.send({success: true, message: "Notes Updated!", data: updateNote});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while updating notes"});
        }
    }

  

  /**
     * @description function written to delete note by ID
     * @param {*} req 
     * @param {*} res 
     * @returns response
     */
   async deleteNotesById(req, res) {
    try {
        let notesId = req.params;
        const notesData = {
            _id: notesId,
            isDeleted: req.body.isDeleted
        }
        const deleteNote = await notesService.deleteNoteById(notesId);
        res.send({success: true, message: "Note Deleted!"});
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: "Some error occurred while updating notes"});
    }
  }

  /**
     * @description function written to add label to note
     * @param {*} a valid noteId is expected
     * @param {*} a valid labelData is expecte
     */
   async addLabelToNote(req, res) {
    try {
        let dataValidation = addingRemovingLabelValidation.validate(req.body);
        if (dataValidation.error) {
            return res.status(400).send({
                message: dataValidation.error.details[0].message
            });
        }
        const notesId = req.body.notesId;
        const labelData = {
            labelId: [req.body.labelId]
        }

        const addLabelName = await notesService.addLabelToNote(notesId, labelData);
        res.send({success: true, message: "Label Added!", data: addLabelName});
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: "Some error occurred while adding label to notes"});
    }
}

/**
 * @description function written to delete label from note
 * @param {*} a valid noteId is expected
 * @param {*} a valid labelData is expected
 * @returns 
 */
 async deleteLabelFromNote(req, res) {
    try {
        let dataValidation = addingRemovingLabelValidation.validate(req.body);
        if (dataValidation.error) {
            return res.status(400).send({
                message: dataValidation.error.details[0].message
            });
        }
        const notesId = req.body.notesId;
        const labelData = {
         labelId: [req.body.labelId]
        }

        const addLabelName = await notesService.deleteLabelFromNote(notesId, labelData);
        res.send({success: true, message: "Label Deleted!", data: addLabelName});
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: "Some error occurred while deleting label from notes"});
    }
 }
}


module.exports = new NotesController();





    