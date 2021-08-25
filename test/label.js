const mocha = require('mocha')
const chai = require('chai')
 const chaiHttp = require('chai-http')
const server = require('../server')
const result = require('../test/label.json')
const notesResult = require('../test/notes.json')
const userData = require('../test/data.json');
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
     */
     describe('POST labels /create', () => {
        it('givenCreteLabelDetails_whenProper_shouldmakePOSTRequestAndCreateLabel', (done) => {
            chai.request(server)
                .post('/createLabel/611dc8d14652ea03d066b38e')
                .send(result.labelCreatePos)
                .set('token', token)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Label Created!");
                    if (error) {
                        return done(error);
                    }
                    done();
                });
        })

        it('givenDetails_WhenNotPassingToken_shouldNotCreateLable', (done) => {
            chai.request(server)
                .post('/createLabel/611dc8d14652ea03d066b38e')
                .send(result.labelCreatePos)
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
            .send(result.labelCreateNegWithNoNotesId)
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
            .send(result.labelCreateNeg)
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
      */
     describe('PUT /updateLabel/:Labeld', () => {
        it('givenUpdateLabelDetails_whenProper_shouldMakePUTRequestToUpdateLable', (done) => {
            chai.request(server)
                .put('/updateLabel/611dc8d14652ea03d066b38e')
                .send(result.lablePutPos)
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
                .send(result.lablePutEmptyNeg)
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
                .send(result.lablePutPos)
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
     * 
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



        









