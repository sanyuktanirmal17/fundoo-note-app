const mocha = require('mocha')
const chai = require('chai')

 const chaiHttp = require('chai-http')
const server = require('../server')
const userInputs = require('../test/notes.json')
const userInput = require('../test/label.json')
const UserData = require('../test/data.json');

//assertion style
const should = chai.should();
chai.use(chaiHttp);
let token = '';

beforeEach((done) => {
    chai.request(server)
        .post('/login')
        .send(UserData.user.userLoginPos)
        .end((error, res) => {
            if (error) {
              return done(error);
            }
            // console.log('BeforeEach token', res.body.token)
            token = res.body.token;
            done();
        });
});

    /**
     * /POST request test
     * Positive and Negative - Creation of Notes
     */
    describe('POST notes /create', () => {
        it('givenCreteNoteDetails_whenProper_shouldSaveInDB', (done) => {
            let UserNotes  = userInputs.notesCreatePos
            chai.request(server)
                .post('/createNotes')
                .send(UserNotes)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(200);
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Notes Created!");
                    return done();
                });
        });

        it('givenCreteNoteDetails_whenInvalidTitle_shouldFailsToMakePOSTRequestToCreateNote', (done) => {
            let UserNotes  = userInputs.notesCreateNegTitle
            chai.request(server)
                .post('/createNotes')
                .send(UserNotes)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"title\" is not allowed to be empty");
                    return done();
                });
        });

        it('givenCreteNoteDetails_whenInvalidDescription_shouldFailsToMakePOSTRequestToCreateNote', (done) => {
            let UserNotes = userInputs.notesCreateNegDescription
            chai.request(server)
                .post('/createNotes')
                .send(UserNotes)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"description\" is not allowed to be empty");
                    return done();
                });
        });

        it('givenDetails_WhenNotPassingToken_shouldNotCreateNotes', (done) => {
            chai.request(server)
                .get('/notes/notes')
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("Authorisation failed! Invalid user");
                    return done();
                });
        });
    });


    /**
     * /GET request test
     * Positive and Negative - Get all Notes from database
     */
    describe('GET all /notes', () => {
        it('givenValidDetails__whenProper_shouldGETRequestToGetAllNotes', (done) => {
            chai.request(server)
                .get('/notes/notes')
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Notes Retrieved!");
                    return done();
                });
        });

        it('givenDetails_WhenNotPassingToken_shouldNotGetAllNotes', (done) => {
            chai.request(server)
                .get('/notes/notes')
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("Authorisation failed! Invalid user");
                    return done();
                });
        });
    });

     /**
      * /PUT request test
      * Positive and Negative - Updating a single contact using ID into database 
      */
    describe('PUT /note/:notesId', () => {
        it('givenUreteNoteDetails_whenProper_shouldMakePUTRequestToCreateNote', (done) => {
            chai.request(server)
                .put('/note/611e11b9cc019e5c1c9345a5')
                .send(userInputs.notesPutPos)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Notes Updated!");
                    return done();
                });
        });

        it('givenUpdateNoteDetails_whenInvalidTitle_shouldFailsToMakePutRequestToCreateNote', (done) => {
            chai.request(server)
                .put('/note/611e11b9cc019e5c1c9345a5')
                .send(userInputs.notesPutNegTitle)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"title\" is not allowed to be empty");
                    return done();
                });
        });

        it('givenUpdateNoteDetails_whenInvalidDescription_shouldFailsToMakePUtRequestToCreateNote', (done) => {
            chai.request(server)
                .put('/note/611e11b9cc019e5c1c9345a5')
                .send(userInputs.notesPutNegDescription)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("\"description\" is not allowed to be empty");
                    return done();
                });
        });

        it('givenDetails_WhenNotPassingToken_shouldNotUpdateNotes', (done) => {
            chai.request(server)
                .get('/notes/notes')
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("Authorisation failed! Invalid user");
                    return done();
                });
        });
    });

    /**
     * /DELETE request test
     * Positive and Negative - Deleting a single contact using ID into database 
     */
    describe('delete/:notesId', () => {
        it('givenValidDatat_whenProper_shouldDeleteInDB', (done) => {
            chai.request(server)
                .delete('/delete/6122b36581b3cb26188e9f08')
                .send(userInputs.notesDelPos)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Note Deleted!");
                    return done();
                });
        });

        it('givenDatat_whenImProper_shouldNotDeleteInDB', (done) => {
            chai.request(server)
                .delete('/delete')
                .send(userInputs.notesDelNeg)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    return done();
                });
        });

        it('givenDetails_WhenNotPassingToken_shouldNotDeleteNotes', (done) => {
            chai.request(server)
                .get('/notes/notes')
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property("message").eql("Authorisation failed! Invalid user");
                    return done();
                });
        });
    });

  













// const chai = require('chai')

// const chaiHttp = require('chai-http')
// const server = require('../server')
// const notesData = require('./notes.json')

// const should = chai.should();
// chai.use(chaiHttp);
// let token = '';

// beforeEach((done) => {
//     chai.request(server)
//         .post('/login')
//         .send(notesData.validUser)
//         .end((error, res) => {
//             if (error) {
//                 return done(error);
//             }
//             res.should.have.status(200);
//             token = res.body.token;
//             return done();
//         });
//   });

//     /**
//      * /POST request 
//      * For Note Create
//      */
//     describe('POST notes /notes', () => {
//         it('givenValidDataItShould_makePOSTRequestAndCreateNotes_andReturnsStatusCodeAs200', (done) => {
//             let NoteInfo  = notesData.validNote
//             chai.request(server)
//                 .post('/notes')
//                 .send(NoteInfo)
//                 .set('token', token)
//                 .end((error, res) => {
//                     if (error) {
//                         return done(error);
//                     }
//                      res.should.have.status(200);
//                      res.body.should.be.a('object');
//                      res.body.should.have.property("success").eql(true);
//                     return done();
//                 });
//         });

//         it('givenTitleAsEmpty_ValidDescription_ReturnsStatus400', (done) => {
//             let NoteInfo  = notesData.InvalidDataNote
//             chai.request(server)
//                 .post('/notes')
//                 .send(NoteInfo)
//                 .set('token', token)
//                 .end((error, res) => {
//                     if (error) {
//                         return done(error);
//                     }
//                     res.should.have.status(400);
//                     res.body.should.be.a('object');
//                     res.body.should.have.property("success").eql(false);
//                     return done();
//                 });
//         });

//         it('givenInvalidData_WithTitle_Shouldfail_ReturnsStatus400', (done) => {
//             let NoteInfo = notesData.validDescription
//             chai.request(server)
//                 .post('/notes')
//                 .send(NoteInfo)
//                 .set('token', token)
//                 .end((error, res) => {
//                     if (error) {
//                         return done(error);
//                     }
//                     res.should.have.status(400);
//                      res.body.should.be.a('object');
//                      res.body.should.have.property("success").eql(false);
//                     return done();
//                 });
//         });
//     });


//     /**
//      * /GET request 
//      * Get all database of notes
//      */
//     describe('GET all /notes', () => {
//         it('givenValidInoput_ToGetAllNotes_ReturnsStat200', (done) => {
//             chai.request(server)
//                 .get('/notes')
//                 .set('token', token)
//                 .end((error, res) => {
//                     if (error) {
//                         return done(error);
//                     }
//                     res.should.have.status(200);
//                      res.body.should.be.a('object');
//                      res.body.should.have.property("success").eql(true);
//                     res.body.should.have.property("data").should.be.a('object');
//                     return done();
//                 });
//         });
//     });

//      /**
//       * /PUT request 
//       * Usin NoteID
//       * 
//       */
//     describe('PUT /notes/:noteId', () => {
//         it('giveValidData_updateWithNoteID_ReturnsStatus200', (done) => {
//             chai.request(server)
//                 .put('/notes/611f19270e103305341ae27b')
//                 .send(notesData.validUpdateNote)
//                 .set('token', token)
//                 .end((error, res) => {
//                     if (error) {
//                         return done(error);
//                     }
//                     res.should.have.status(200);
//                      res.body.should.be.a('object');
//                      res.body.should.have.property("success").eql(true);
//                     return done();
//                 });
//         });

//         it('givenTitle_WithDescription_notCorrect_ShouldReturnsStatus400', (done) => {
//             chai.request(server)
//                 .put('/notes/611f19270e103305341ae27b')
//                 .send(notesData.invalidUpdateNote)
//                 .set('token', token)
//                 .end((error, res) => {
//                     if (error) {
//                         return done(error);
//                     }
//                     res.should.have.status(400);
//                     res.body.should.be.a('object');
//                     res.body.should.have.property("success").eql(false);
//                     return done();
//                 });
//         });

//         it('giveInvalidData_WithTitle_ShouldGivetatus400', (done) => {
//             chai.request(server)
//                 .put('/notes/611f19270e103305341ae27b')
//                 .send(notesData.invalidDescription)
//                 .set('token', token)
//                 .end((error, res) => {
//                     if (error) {
//                         return done(error);
//                     }
//                     res.should.have.status(400);
//                      res.body.should.be.a('object');
//                      res.body.should.have.property("success").eql(false);
                    
//                     return done();
//                 });
//         });
//     });

//     /**
//      * /DELETE request 
//      * using ID
//      * 
//      */
//     describe('notes/:noteId', () => {
//         it('giveValidData_deleteUsingNoteID_ReturnsStatus200', (done) => {
//             chai.request(server)
//                 .delete('/notes/6119eeb5e390f34140e68305')
//                 .send(notesData.DeleteID)
//                 .set('token', token)
//                 .end((error, res) => {
//                     if (error) {
//                         return done(error);
//                     }
//                     res.should.have.status(200);
//                     res.body.should.be.a('object');
//                      res.body.should.have.property("success").eql(true);
//                     return done();
//                 });
//         });

//         // it('givenInValidData_deleteByNoteID_andReturnStatus400', (done) => {
//         //     chai.request(server)
//         //         .delete('/notes/6119eeb5e390f34140e683789')
//         //         .send(notesData.FalseId)
//         //         .set('token', token)
//         //         .end((error, res) => {
//         //             if (error) {
//         //                 return done(error);
//         //             }
//         //             res.should.have.status(404);
//         //             // res.body.should.be.a('object');
//         //             // res.body.should.have.property("success").eql(false);
//         //             return done();
//         //         });
//         // });
//       });

