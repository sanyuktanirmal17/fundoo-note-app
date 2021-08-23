const mocha = require('mocha')
const chai = require('chai')
// chai-http is an addon plugin for  Chai Assertion Library
 const chaiHttp = require('chai-http')
const server = require('../server')
const userInputs = require('../test/label.json')
const userInput = require('../test/notes.json')
const userData = require('../test/data.json');


//assertion style
const should = chai.should();
chai.use(chaiHttp);
let token = '';

beforeEach((done) => {
    chai.request(server)
        .post('/login')
        .send(userData.user.userLoginPos)
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
     * Positive and Negative - Creation of Labels
     */
     describe('POST labels /create', () => {
        it('givenCreteLabelDetails_whenProper_shouldmakePOSTRequestAndCreateLabel', (done) => {
            chai.request(server)
                .post('/createLabel/611dc8d14652ea03d066b38e')
                .send(userInputs.labelCreatePos)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                   // res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Label Created!");
                    // res.body.should.have.property("data").should.be.a('object');
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        })

        it('givenDetails_WhenNotPassingToken_shouldNotCreateLable', (done) => {
            chai.request(server)
                .post('/createLabel/611dc8d14652ea03d066b38e')
                .send(userInputs.labelCreatePos)
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

        it('givenLabelId_whenNoNotesId_shouldNotAbleToDeletTheLabel', (done) => {
            chai.request(server)
            .post('/createLabel')
            .send(userInputs.labelCreateNegWithNoNotesId)
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

        it('givenLabelDetails_WhenEmptyLabel_shouldNotCreateLable', (done) => {
            chai.request(server)
            .post('/createLabel/611dc8d14652ea03d066b38e')
            .send(userInputs.labelCreateNeg)
            .set('token', token)
            .end((error, res) => {
                if (error) {
                    return done(error);
                }
                    res.should.have.status(400);
                    res.body.should.have.property("message").eql('"labelName" is not allowed to be empty');
                    return done();
                })
        })
    })

        /**
     * /GET request test
     * Positive and Negative - Get all Labels from database
     */
    describe('GET all /Labels', () => {
        it('givenValidDetails__whenProper_shouldGETRequestToGetAllLabels', (done) => {
            chai.request(server)
                .get('/labels/labels')
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Labels Retrieved!");
                    return done();
                });
        });


        it('givenDetails_WhenNotPassingToken_shouldNotGetAllLabels', (done) => {
            chai.request(server)
                .get('/labels/labels')
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
     describe('PUT /updateLabel/:Labeld', () => {
        it('givenUpdateLabelDetails_whenProper_shouldMakePUTRequestToUpdateLable', (done) => {
            chai.request(server)
                .put('/updateLabel/611dc8d14652ea03d066b38e')
                .send(userInputs.lablePutPos)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Label Name Updated!");
                    return done();
                });
        });

        it('givenWrongLabelId_whenImProper_shouldNotAbleToUpdateTheLabel', (done) => {
            chai.request(server)
                .put('/updateLabel/611dc8d14652ea03d066b38e')
                .send(userInputs.lablePutEmptyNeg)
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    if (error) {
                        return done(error);
                    }
                        res.should.have.status(400);
                        res.body.should.have.property("message").eql('"labelName" is not allowed to be empty');
                        return done();
                    })
        })

        it('givenLabelId_whenNoNotesId_shouldNotAbleToDeletTheLabel', (done) => {
            chai.request(server)
            .put('/updateLabel')
                .send(userInputs.lablePutPos)
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

        it('givenDetails_WhenNotPassingToken_shouldNotUpdateLable', (done) => {
            chai.request(server)
                .put('/updateLabel/611dc8d14652ea03d066b38e')
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
     describe('delete/:labelId', () => {
        it('givenValidDatat_whenProper_shouldDeleteInDB', (done) => {
            chai.request(server)
                .delete('/deleteLabel/6119eeb5e390f34140e68305')
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Label Deleted!");
                    return done();
                });
        });

        it('givenLabelId_whenNoLabelId_shouldNotAbleToDeletTheLabel', (done) => {
            chai.request(server)
                .delete('/deleteLabel')
                .set('token', token)
                .end((error, res) => {
                    if (error) {
                        return done(error);
                    }
                    res.should.have.status(400);
                    return done();
                });
        });

        it('givenDetails_WhenNotPassingToken_shouldNotDeleteLabel', (done) => {
            chai.request(server)
            .delete('/deleteLabel/6119eeb5e390f34140e68305')
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



        









