const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const emailDetails = require('../test/data.json')

chai.use(chaiHttp)


chai.should()

describe(' /forgorPassword' , () => {
  it('writtenMail_shouldBeCorrect_shouldSendMail_True', (done) => {
    const forgotPassword = emailDetails.data.forgotPasswordData
    chai
      .request(server)
      .post('/forgotPassword')
      .send(forgotPassword)
      .end((error, res) => {
        if (error) {
          return done(error)
        }
        res.should.have.status(200)
        res.body.should.have.property('success').eql(true)
        res.body.should.have.property('message').eql(' Email sent successfully')
        done()
      })
  })
  it('writtenMail_NotCorrect_shouldNotSendMail_False', (done) => {
    const forgotPassword = emailDetails.data.forgotPasswordWithImproperData
    chai
      .request(server)
      .post('/forgotPassword')
      .send(forgotPassword)
      .end((error, res) => {
        if (error) {
          return done(error)
        }
        res.should.have.status(400)
        res.body.should.have.property('success').eql(true)
        res.body.should.have.property('message').eql('failed to send email')
        done()
      })
  })
})