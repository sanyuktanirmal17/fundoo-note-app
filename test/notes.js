const mocha = require('mocha')
const chai = require('chai')

 const chaiHttp = require('chai-http')
const server = require('../server')
const notesResult = require('../test/notes.json')
const result = require('../test/label.json')
const UserData = require('../test/data.json');
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
            token = res.body.token;
            done();
        });
});

    /**
     * /POST request test
     * 
     */
    describe('POST notes /create', () => {
        it('givenCreteNoteDetails_whenProper_shouldSaveInDB', (done) => {
            let notesData  = notesResult.notesCreatePos
            chai.request(server)
                .post('/createNotes')
                .send(notesData)
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
            let notesData  = notesResult.notesCreateNegTitle
            chai.request(server)
                .post('/createNotes')
                .send(notesData)
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
            let notesData = notesResult.notesCreateNegDescription
            chai.request(server)
                .post('/createNotes')
                .send(notesData)
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
      */
    describe('PUT /note/:notesId', () => {
        it('givenUreteNoteDetails_whenProper_shouldMakePUTRequestToCreateNote', (done) => {
            chai.request(server)
                .put('/note/611e11b9cc019e5c1c9345a5')
                .send(notesResult.notesPutPos)
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
                .send(notesResult.notesPutNegTitle)
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
                .send(notesResult.notesPutNegDescription)
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
     */
    describe('delete/:notesId', () => {
        it('givenValidDatat_whenProper_shouldDeleteInDB', (done) => {
            chai.request(server)
                .delete('/delete/6122b36581b3cb26188e9f08')
                .send(notesResult.notesDelPos)
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
                .send(notesResult.notesDelNeg)
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

  













