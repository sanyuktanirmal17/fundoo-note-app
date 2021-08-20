
const chai = require('chai')

const chaiHttp = require('chai-http')
 require('superagent')
const server = require('../server')
const notesData = require('./notes.json')

const should = chai.should();
chai.use(chaiHttp);
let token = '';

beforeEach((done) => {
    chai.request(server)
        .post('/login')
        .send(notesData.validUser)
        .end((error, res) => {
            if (error) {
                return done(error);
            }
            res.should.have.status(200);
            token = res.body.token;
            return done();
        });
  });

    /**
     * /POST request 
     * For Note Create
     */
    describe('POST notes /notes', () => {
        it('givenValidDataItShould_makePOSTRequestAndCreateNotes_andReturnsStatusCodeAs200', (done) => {
            let NoteInfo  = notesData.validNote
            chai.request(server)
                .post('/notes')
                .send(NoteInfo)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property("success").eql(true);
                    return done();
                });
        });

        it('givenTitleAsEmpty_ValidDescription_ReturnsStatus400', (done) => {
            let NoteInfo  = notesData.InvalidDataNote
            chai.request(server)
                .post('/notes')
                .send(NoteInfo)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(false);
                    return done();
                });
        });

        it('givenInvalidData_WithTitle_Shouldfail_ReturnsStatus400', (done) => {
            let NoteInfo = notesData.validDescription
            chai.request(server)
                .post('/notes')
                .send(NoteInfo)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(400);
                     res.body.should.be.a('object');
                     res.body.should.have.property("success").eql(false);
                    return done();
                });
        });
    });


    /**
     * /GET request 
     * Get all database of notes
     */
    describe('GET all /notes', () => {
        it('givenValidInoput_ToGetAllNotes_ReturnsStat200', (done) => {
            chai.request(server)
                .get('/notes')
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("data").should.be.a('object');
                    return done();
                });
        });
    });

     /**
      * /PUT request 
      * Usin NoteID
      * 
      */
    describe('PUT /notes/:noteId', () => {
        it('giveValidData_updateWithNoteID_ReturnsStatus200', (done) => {
            chai.request(server)
                .put('/notes/611f19270e103305341ae27b')
                .send(notesData.validUpdateNote)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property("success").eql(true);
                    return done();
                });
        });

        it('givenTitle_WithDescription_notCorrect_ShouldReturnsStatus400', (done) => {
            chai.request(server)
                .put('/notes/611f19270e103305341ae27b')
                .send(notesData.invalidUpdateNote)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(false);
                    return done();
                });
        });

        it('giveInvalidData_WithTitle_ShouldGivetatus400', (done) => {
            chai.request(server)
                .put('/notes/611f19270e103305341ae27b')
                .send(notesData.invalidDescription)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(400);
                     res.body.should.be.a('object');
                     res.body.should.have.property("success").eql(false);
                    
                    return done();
                });
        });
    });

    /**
     * /DELETE request 
     * using ID
     * 
     */
    describe('notes/:noteId', () => {
        it('giveValidData_deleteUsingNoteID_ReturnsStatus200', (done) => {
            chai.request(server)
                .delete('/notes/6119eeb5e390f34140e68305')
                .send(notesData.DeleteID)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                     res.body.should.have.property("success").eql(true);
                    return done();
                });
        });

        // it('givenInValidData_deleteByNoteID_andReturnStatus400', (done) => {
        //     chai.request(server)
        //         .delete('/notes/6119eeb5e390f34140e683789')
        //         .send(notesData.FalseId)
        //         .set('token', token)
        //         .end((error, res) => {
        //             if (error) {
        //                 return done(error);
        //             }
        //             res.should.have.status(404);
        //             // res.body.should.be.a('object');
        //             // res.body.should.have.property("success").eql(false);
        //             return done();
        //         });
        // });
      });

