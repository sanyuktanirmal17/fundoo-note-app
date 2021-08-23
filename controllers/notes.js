/********************************************************************************************************
 * @description   : It is use to taking the request from the client and gives the response and
 *                  validating whether the input is correct or not.
 * @file          : user.js
 * @author        : sanyukta
********************************************************************************************************/

const notesService = require('../service/notes');
const {notesCreationValidation, addingRemovingLabelValidation} = require('../middleware/user');
logger = require('../logger/logger');


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
            const notesData = {
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
            res.send({success: true, message: "Notes Retrieved!", data: getAllNotes});
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while retrieving notes"});
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

  //   /**
  //    * @description function written to delete note by ID
  //    * @param {*} req 
  //    * @param {*} res 
  //    */
  //   // finding note and updating it with the request body
  //     deleteNotesById = (req, res) => {
  //       try {
  //         console.log(req.params)
  //         notesService.deleteNoteById(req.params)
  //       .then((note) => {
  //         if (!note) {
  //           return res.status(404).send({
  //             success: false,
  //             message: "Note not found with id " + req.params,
  //           });
  //         }
  //         res.send({
  //           success: true,
  //           message: "Note deleted successfully!",
  //           data: note,
  //         });
  //       })
  //       .catch((err) => {
  //         logger.error("Error while deleting the note", err);
  //         res.status(500).json({
  //           success: false,
  //           message: err,
  //         });
  //       });
  //   } catch (error) {
  //     logger.error("Error while deleting the note", error);
  //     res.status(500).json({
  //       success: false,
  //       message: error,
  //     });
  //   }
  // };

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
     * @param {*} a valid labelData is expected
     * @returns 
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

//exporting th whole class to utilize or call function created in this class
module.exports = new NotesController();



//       /**
//      * 
//      * @method : createNote is used to create note for user.
//      * @param {httpRequest} req 
//      * @param {http Response} res 
//      *  
//      */
    
//     async  createNote(req, res) {
//         try {
//             if ((!req.body.title) || (!req.body.description)) {
//                 return res.status(400).send({
//                     success: false,
//                     message: 'Please fill correct and complete details.'
//                 });
//             };
//             let validateNote = notesValidation.validate(req.body);
//             if (validateNote.error) {
//                 return res.status(422).send({
//                     message: validateNote.error.details[0].message
//                 });
//             }
//             const noteData = {
//                 title: req.body.title,
//                 description: req.body.description,
//                 // userId: req.userId
//             }
//             const notesCreated = await noteServices.createNote(noteData);
//             res.send({success: true, message: "Notes Created!", data: notesCreated});
//         } catch (error) {
//             console.log(error);
//             res.status(500).send({success: false, message: "Some error occurred while creating notes" });
//         }
//     }
//     /**
//      * 
//      * @method : updateNote is used to update the already created note by user..
//      * @param {httpRequest} req 
//      * @param {http Response} res 
//      *  
//      */
//      updateNote = (req, res) => {
//         try {
//             if ((!req.body.title) || (!req.body.description)) {
//                 return res.status(400).send({
//                     success: false,
//                     message: 'Please fill correct and complete details.'
//                 });
//             };

//             const noteData = {
//                 title: req.body.title,
//                 description: req.body.description,
//                  noteId: req.params.noteId
//             }

//             noteServices.updateNote(noteData, (err, noteResult) => {
//                 if (noteResult === null) {
//                     return res.status(400).send({
//                         success: false,
//                         message: 'Please check your Id again' + res.params.noteId,
//                         err,
//                     });
//                 } else {
//                     return res.status(200).send({
//                         success: true,
//                         message: 'Your note is updated successfully',
//                         // data: noteResult
//                     });
//                 }
//             });
//         }
//         catch (error) {
//             res.status(500).send({
//                 success: false,
//                 message: "There is some internal error from server."
//             })
//         }
//     }; 
    
//     /**
//      * 
//      * @method : retrieveNote is used to retrieve the notes.
//      * @param {httpRequest} req 
//      * @param {http Response} res 
//      *  
//      */
//      retrieveNote = (req, res) => {
//         try {
//             noteServices.retrieveNote((err, noteResult) => {
//                 if (err) {
//                     return res.status(400).send({
//                         success: false,
//                         message: 'Un-able to retrive notes'
//                     });
//                 } else {
//                     return res.status(200).send({
//                         success: true,
//                         message: 'Your notes retrived successfully',
//                         data: noteResult
//                     });
//                 }
//             });
//         }
//         catch (error) {
//             res.status(500).send({
//                 success: false,
//                 message: "There is some internal error from server"
//             })
//         }
//     };
//     /**
//      * 
//      * @method : deleteNote is used to delete the note.
//      * @param {httpRequest} req 
//      * @param {http Response} res 
//      *  
//      */
//     deleteNote = (req, res) => {
//         try {
//             const noteId = req.params;
//             noteServices.deleteNote(noteId)
//                 .then(noteData => {
//                     res.status(200).send({
//                           success: true, 
//                           message: "Notes removed successfully!", 
//                           data:noteData
//                      });
//                 }).catch(error =>{
//                     logger.error("Error while deleting the note", error);
//                     res.status(500).send({
//                         success: false,
//                          message: "Some error occurred while removing notes",
//                          error
//                     })
//                 })       
//             }
//         catch (error) {
//             logger.error("Error while deleting the note", error);
//             res.status(500).send({
//                 success: false,
//                 message: "There is some internal error from server"
//             })
//         }
//     };


// /**
//      * @description function written to add label to note
//      * @param {*} a valid noteId is expected
//      * @param {*} a valid labelData is expected
//      * @returns 
//      */
//     a/**
//      * 
//      * @param {httpRequest} req 
//      * @param {http Response} res 
//      * @description :  addLabelToNote is used to add the label to the note.
//      */
//     addLabelToNote = (req, res) => {
//         try {
//             const data = {
//                 labelId: req.body.labelId,
//                 noteId: req.body.noteId,
//                 userId: req.userId,
//             };
//             noteServices.addLabelToNote(data, (err, data) => {
//                 if (err) {
//                     return res.status(400).send({
//                         success: false,
//                         message: 'Unable to add your label into note',
//                         err,
//                     });
//                 }
//                 return res.status(200).send({
//                     success: true,
//                     message: 'Your label is added to the note successfully',
//                      data
//                 });
//             });
//         } catch (err) {
//             res.status(500).send({
//                 success: false,
//                 message: 'There is some internal error from server'
//             });
//         }
//     }

// }


    module.exports = new NotesController();