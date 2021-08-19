/********************************************************************************************************
 * @description   : It is use to taking the request from the client and gives the response and
 *                  validating whether the input is correct or not.
 * @file          : user.js
 * @author        : sanyukta
********************************************************************************************************/

const noteServices = require('../service/notes');
require('dotenv');
const { notesValidation } = require('../middleware/user');

class NotesController {
      /**
     * 
     * @method : createNote is used to create note for user.
     * @param {httpRequest} req 
     * @param {http Response} res 
     *  
     */
    
    async  createNote(req, res) {
        try {
            if ((!req.body.title) || (!req.body.description)) {
                return res.status(400).send({
                    success: false,
                    message: 'Please fill correct and complete details.'
                });
            };
            let validateNote = notesValidation.validate(req.body);
            if (validateNote.error) {
                return res.status(400).send({
                    message: validateNote.error.details[0].message
                });
            }
            const noteData = {
                title: req.body.title,
                description: req.body.description,
                // userId: req.userId
            }
            const notesCreated = await noteServices.createNote(noteData);
            res.send({success: true, message: "Notes Created!", data: notesCreated});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while creating notes" });
        }
    }
    /**
     * 
     * @method : updateNote is used to update the already created note by user..
     * @param {httpRequest} req 
     * @param {http Response} res 
     *  
     */
     updateNote = (req, res) => {
        try {
            if ((!req.body.title) || (!req.body.description)) {
                return res.status(400).send({
                    success: false,
                    message: 'Please fill correct and complete details.'
                });
            };

            const noteData = {
                title: req.body.title,
                description: req.body.description,
                 noteId: req.params.noteId
            }

            noteServices.updateNote(noteData, (err, noteResult) => {
                if (noteResult === null) {
                    return res.status(400).send({
                        success: false,
                        message: 'Please check your Id again' + res.params.noteId,
                        err,
                    });
                } else {
                    return res.status(200).send({
                        success: true,
                        message: 'Your note is updated successfully',
                        // data: noteResult
                    });
                }
            });
        }
        catch (error) {
            res.status(500).send({
                success: false,
                message: "There is some internal error from server."
            })
        }
    }; 
    
    /**
     * 
     * @method : retrieveNote is used to retrieve the notes.
     * @param {httpRequest} req 
     * @param {http Response} res 
     *  
     */
     retrieveNote = (req, res) => {
        try {
            noteServices.retrieveNote((err, noteResult) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message: 'Un-able to retrive notes'
                    });
                } else {
                    return res.status(200).send({
                        success: true,
                        message: 'Your notes retrived successfully',
                        data: noteResult
                    });
                }
            });
        }
        catch (error) {
            res.status(500).send({
                success: false,
                message: "There is some internal error from server"
            })
        }
    };
    /**
     * 
     * @method : deleteNote is used to delete the note.
     * @param {httpRequest} req 
     * @param {http Response} res 
     *  
     */
    deleteNote = (req, res) => {
        try {
            const noteId = req.params;
            noteServices.deleteNote(noteId)
                .then(noteData => {
                    res.status(200).send({
                          success: true, 
                          message: "Notes removed successfully!", 
                          data:noteData
                     });
                }).catch(error =>{
                    res.status(500).send({
                        success: false,
                         message: "Some error occurred while removing notes",
                         error
                    })
                })       
            }
        catch (error) {
            res.status(500).send({
                success: false,
                message: "There is some internal error from server"
            })
        }
    };
}


    module.exports = new NotesController();