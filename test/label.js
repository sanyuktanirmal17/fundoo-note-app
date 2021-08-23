// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const server = require('../server');

// chai.use(chaiHttp);
// const labelData = require('./label.json');

// chai.should();
// let token = ' ';

// describe('Labels', () => {
//     before((done) => {
//         chai.request(server)
//             .post('/login')
//             .send(labelData.labels.login)
//             .end((err, res) => {
//                 token = res.body.Token;
//                 done();
//             });
//     });

//     describe('create Label', () => {
//         it('givenLabelDetails_whenProper_ShouldCreateLabel', () => {
//             chai.request(server).post('/label').set('token', token)
//                 .send(labelData.labels.createLabel)
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                 });
//         });
//         it('givenLabelDetails_whenWrong_ShouldNotCreateLabel', () => {
//             chai.request(server).post('/label').set('token', token)
//                 .send()
//                 .end((err, res) => {
//                     res.should.have.status(500);
//                 });
//         });
//         it('givenToken_whenWrong_shouldNotCreateLabel', () => {
//             chai.request(server).post('/label').set('token', `${labelData.labels.genratedToken.wrongToken}`)
//                 .send(labelData.labels.createLabel)
//                 .end((err, res) => {
//                     res.should.have.status(401);
//                 });
//         });
//     });

//     describe('retrieve Label', () => {
//         it('giveToken_whenProper_ShouldRetrieveLabel', () => {
//             chai.request(server).get('/label').set('token', token)
//                 .send()
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                 });
//         });
//         it('givenToken_whenWrong_shouldNotCreateLabel', () => {
//             chai.request(server).post('/label').set('token', `${labelData.labels.genratedToken.wrongToken}`)
//                 .send(labelData.labels.createLabel)
//                 .end((err, res) => {
//                     res.should.have.status(401);
//                 });
//         });
//     });

//     describe('update Label', () => {
//         it('giveCorrectIdForUpdate_whenProper_ShouldUpdateLabel', () => {
//             chai.request(server).put('/label/60bed76e9315901fa8648bda')
//                 .set('token', token)
//                 .send(labelData.labels.updateLabel)
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                 });
//         });
//         it('givenLabelId_whenWrong_ShouldNotUpdateLabel', () => {
//             chai.request(server).put('/label/60bed76e9315901648bda')
//                 .set('token', token)
//                 .send(labelData.labels.updateLabel)
//                 .end((err, res) => {
//                     res.should.have.status(400);
//                 });
//         });
//         it('givenTokenDetails_whenWrong_shouldNotCreateLabel', () => {
//             chai.request(server).post('/label').set('token', `${labelData.labels.genratedToken.wrongToken}`)
//                 .send(labelData.labels.createLabel)
//                 .end((err, res) => {
//                     res.should.have.status(401);
//                 });
//         });
//     });

//     describe('delete Label', () => {
//         it('giveLabelId_whenProper_shouldDeleteLabel', () => {
//             chai.request(server).delete('/label/60bee68f2bea9217f44af367')
//                 .set('token', token).send()
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                 });
//         });

//         it('giveLabelId_whenWrong_ShouldNotDeleteLabel', () => {
//             chai.request(server).delete('/label/60bee68f2bea9217f4467')
//                 .set('token', token).send()
//                 .end((err, res) => {
//                     res.should.have.status(400);
//                 });
//         });
//         it('givenTokenDetails_whenWrong_shouldNotDeleteLabel', () => {
//             chai.request(server).post('/label').set('token', `${labelData.labels.genratedToken.wrongToken}`)
//                 .send(labelData.labels.createLabel)
//                 .end((err, res) => {
//                     res.should.have.status(401);
//                 });
//         });
//     });

//     describe('add Label To Note', () => {
//         it('givenLabelAndNoteId_whenProper_shouldAddLabelToTheNote', () => {
//             chai.request(server).post('/addLabelToNote').set('token', token)
//                 .send(labelData.labels.addLabelIntoNote)
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                 });
//         });
//         it('givenLabelId_whenWrong_ShouldNotAddLabelToNote', () => {
//             chai.request(server).delete('/label/60c2cb2932aa660f550')
//                 .set('token', token).send()
//                 .end((err, res) => {
//                     res.should.have.status(400);
//                 });
//         });
//         it('givenTokenDetails_whenWrong_ShouldNotAddLabelToNote', () => {
//             chai.request(server).post('/addLabelToNote').set('token', `${labelData.labels.genratedToken.wrongToken}`)
//                 .send(labelData.labels.addLabelIntoNote)
//                 .end((err, res) => {
//                     res.should.have.status(401);
//                 });
//         });
//         it('givenTokenDetails_whenMissing_shouldNotAddLabelToTheNote', () => {
//             chai.request(server).post('/addLabelToNote').send(labelData.labels.addLabelIntoNote)
//                 .end((err, res) => {
//                     res.should.have.status(401);
//                 });
//         });
//     });
// })