const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const noteData = require('./notes.json');

chai.should();

describe('notes', () => {
  it('givenNoteDetails_whenProper_shouldAbleToCreateANote', (done) => {
    chai
      .request(server)
      .post('/notes')
      .set('token', `${noteData.notes.credential.token}`)
      .send(noteData.notes.createNotes)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenNoteDetails_whenImProper_shouldNotAbleToCreateANote', (done) => {
    chai
      .request(server)
      .post('/notes')
      .set('token', `${noteData.notes.credential.token}`)
      .send(noteData.notes.createNoteWithImproperData)
      .end((err, res) => {
        res.should.have.status(404);
      });
    done();
  });

  it('givenNoteDetails_whenProper_ButTokenMissing_shouldNotAbleToCreateANote', (done) => {
    chai
      .request(server)
      .post('/notes')
      .send(noteData.notes.createNote)
      .end((err, res) => {
        res.should.have.status(404);
      });
    done();
  });

  it('givenNoteDetails_whenProper_ButTokenIsWrong_shouldNotAbleToCreateANote', (done) => {
    chai
      .request(server)
      .post('/notes')
      .set('token', `${noteData.notes.credential.wrongToken}`)
      .send(noteData.notes.createNoteWithImproperData)
      .end((err, res) => {
        res.should.have.status(404);
      });
    done();
  });
});

describe('retriveNotes', () => {
  it('givenDetails_whenProper_shouldAbleToRetriveAllNote', (done) => {
    chai
      .request(server)
      .get('/notes')
      .set('token', `${noteData.notes.credential.token}`)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('givenToken_whenImProper_shouldNotAbleToRetriveAllNote', (done) => {
    chai
      .request(server)
      .get('/notes')
      .set('token', `${noteData.notes.credential.wrongToken}`)
      .send()
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('update notes', () => {
  it('givenNoteIDDetails_whenProper_shouldAbleToUpdate_ExistingNote', (done) => {
    chai
      .request(server)
      .put('/notes/611b49d6b47fff45d89a8144')
      .set('token', `${noteData.notes.credential.token}`)
      .send(noteData.notes.updateData)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenNoteIDDetails_whenNotIDImProper_shouldNotAbleToUpdate_ExistingNote', (done) => {
    chai
      .request(server)
      .put('/notes/611c750e4d6cc640084c9b41')
      .set('token', `${noteData.notes.credential.token}`)
      .send(noteData.notes.updateData)
      .end((err, res) => {
        res.should.have.status(404);
      });
    done();
  });

  it('givenToken_whenImProper_shouldNotAbleToUpdate_ExistingNote', (done) => {
    chai
      .request(server)
      .put('/notes/611c750e4d6cc640084c9b41')
      .set('token', `${noteData.notes.credential.wrongToken}`)
      .send(noteData.notes.updateData)
      .end((err, res) => {
        res.should.have.status(404);
      });
    done();
  });

  it('givenNoteIDisEmpty_whenImProper_shouldNotAbleToUpdate_ExistingNote', (done) => {
    chai
      .request(server)
      .put('/notes/')
      .set('token', `${noteData.notes.credential.token}`)
      .send(noteData.notes.updateData)
      .end((err, res) => {
        res.should.have.status(404);
      });
    done();
  });
});


// describe('delete note', () => {
//   it('givenNoteIDDetails_whenProper_shouldAbleToAddInTrash', (done) => {
//     chai
//       .request(server)
//       .delete('/notes/611b49d6b47fff45d89a8144')
// 
    //   .set('token', `${noteData.notes.credential.token}`)
//       .send(noteData.notes.changeTrashStatus)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//   });

//   it('givenNoteIDDetails_whenEmpty_shouldNotAbleToAddInTrash', (done) => {
//     chai
//       .request(server)
//       .delete('/notes/')
//       .set('token', `${noteData.notes.credential.token}`)
//       .send(noteData.notes.changeTrashStatus)
//       .end((err, res) => {
//         res.should.have.status(404);
//         done();
//       });
//   });

//   it('givenNoteIDDetails_whenImProper_shouldNotAbleToAddInTrash', (done) => {
//     chai
//       .request(server)
//       .delete('/notes/611b49d6b47fff45d89a84')
//       .set('token', `${noteData.notes.credential.token}`)
//       .send(noteData.notes.changeTrashStatus)
//       .end((err, res) => {
//         res.should.have.status(404);
//       });
//     done();
//   });

//   it('givenToken_whenImProper_shouldNotAbleToAddInTrash', (done) => {
//     chai
//       .request(server)
//       .delete('/notes/611b49d6b47fff45d89a8144')
//       .set('token', `${noteData.notes.credential.wrongToken}`)
//       .send(noteData.notes.changeTrashStatus)
//       .end((err, res) => {
//         res.should.have.status(404);
//         done();
//       });
//   });

//   it('givenToken_whenEmpty_shouldAbleToAddInTrash', (done) => {
//     chai
//       .request(server)
//       .delete('/notes/60961015ba511f4c480119a9')
//       .send(noteData.notes.changeTrashStatus)
//       .end((err, res) => {
//         res.should.have.status(401);
//         done();
//       });
//    });
// });