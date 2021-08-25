/* eslint-disable no-undef */
const chai = require('chai')
// chai-http is an addon plugin for  Chai Assertion Library
const chaiHttp = require('chai-http')
const server = require('../server')

chai.use(chaiHttp)
const userInputs = require('./data.json')

chai.should()

/**
 * Post Request
 * Positive Test for registration, and saving to DB
 */
// describe('register', () => {
//   // mini discribe
//   it('givenRegistrationDetails_whenProper_shouldSaveInDB', (done) => {
//     const registartionDetails = userInputs.user.registration
//     chai
//       .request(server)
//       .post('/register')
//       .send(registartionDetails)
//       .end((error, res) => {
//         if (error) {
//           return done('Please check details again and re-enter the details with proper format')
//         }
//         res.should.have.status(201)
//         // res.body.should.have.property('success').eql(true)
//         // res.body.should.have.property('message').eql('created successfully')
//         done()
//       })
//   })
  /**
   * Post Request
   * Negative Test Case, By not giving last name
   */

  // it('givenRegistrationDetails_whenNolastName_shouldNotSaveInDB', (done) => {
  //   const registartionDetails = userInputs.user.registrationWithNolastName
  //   chai
  //     .request(server)
  //     .post('/register')
  //     .send(registartionDetails)
  //     .end((_err, res) => {
  //       res.should.have.status(400);
  //       done()
  //     })
  // })

  // it('givenRegistrationDetails_whenNoemailId_shouldNotSaveInDB', (done) => {
  //   const registartionDetails = userInputs.user.registrationWithNoemailId
  //   chai
  //     .request(server)
  //     .post('/register')
  //     .send(registartionDetails)
  //     .end((_err, res) => {
  //       res.should.have.status(400)
  //       done()
  //     })
  // })

  // it('givenRegistrationDetails_whenNoPassword_shouldNotSaveInDB', (done) => {
  //   const registartionDetails = userInputs.user.registrationWithNoPassword
  //   chai
  //     .request(server)
  //     .post('/register')
  //     .send(registartionDetails)
  //     .end((_err, res) => {
        // the server cannot or will not process the request
        // res.should.have.status(400)
        // res.body.should.have.property('success').eql(true)
        // done()
  //     })
  // })


/**
 * /POST request test
 * Positive and Negative - Login of User Testing
 */
describe('login', () => {
  it('givenloginDetails_whenProper_shouldAbleToLogin', (done) => {
    const loginDetails = userInputs.user.userLoginPos
    chai.request(server)
      .post('/login')
      .send(loginDetails)
      .end((error, res) => {
        if (error) {
          return done('Please enter valid email-id and password')
        }
        res.should.have.status(200)
        // res.body.should.be.a('object')
         res.body.should.have.property('success').eql(true)
        // res.body.should.have.property('message').eql('logged in successfully')
        // res.body.should.have.property('token')
        return done()
      })
  })

  it('givenLoginDetails_whenInvalidEmailId_shouldNotAbleToLogin', (done) => {
    const loginDetails = userInputs.user.userLoginNegEmail
    chai.request(server)
      .post('/login')
      .send(loginDetails)
      .end((error, res) => {
        if (error) {
          return done('Recived valid email-id instead of invalid email-id')
        }
        // res.should.have.status(400)
        // res.body.should.be.a('object')
        // res.body.should.have.property('message').eql('login failed')
        return done()
      })
  })

  it('givenLoginDetails_whenPasswordIsEmpty_shouldNotAbleToLogin', (done) => {
    const loginDetails = userInputs.user.userLoginEmpPassword
    chai.request(server)
      .post('/login')
      .send(loginDetails)
      .end((error, res) => {
        if (error) {
          return done('Password is not empty')
        }
         res.should.have.status(400)
        // res.body.should.be.a('object')
        // res.body.should.have.property('message').eql('login failed')
        return done()
      })
  })

  it('givenLoginDetails_whenInvalidPassword_shouldNotAbleToLogin', (done) => {
    const loginDetails = userInputs.user.userLoginNegPassword
    chai.request(server)
      .post('/login')
      .send(loginDetails)
      .end((error, res) => {
        if (error) {
          return done('Password is empty or unable to fetch details')
        }
         res.should.have.status(400)
        // res.body.should.be.a('object')
        // res.body.should.have.property('message').eql('login failed')
        return done()
      })
  })
})

/**
 * /POST request test
 * Positive and Negative - Forgot Password of User Testing
 */
describe('forgotPassword', () => {
  it('givenValidData_whenProper_souldAbleToSendEmailToUserEmail', (done) => {
    const forgotPasswordDetails = userInputs.user.userForgotPasswordPos
    chai.request(server)
      .post('/forgotPassword')
      .send(forgotPasswordDetails)
      .end((error, res) => {
        if (error) {
          return done('Invalid details received instead of valid')
        }
         res.should.have.status(200)
        // res.body.should.be.a('object')
        // res.body.should.have.property('success').eql(true)
        // res.body.should.have.property('message').eql('User email id exist and Email sent successfully')
        return done()
      })
  })

  it('givenInValidEmail_whoInvalidEmailId_shouldNotAbleToSendEmailToUserEmail', (done) => {
    const forgotPasswordDetails = userInputs.user.userForgotPasswordNegNonRegistered
    chai.request(server)
      .post('/forgotPassword')
      .send(forgotPasswordDetails)
      .end((error, res) => {
        if (error) {
          return done('email-id is empty or unable to fetch details')
        }
        //  res.should.have.status(400)
        // res.body.should.be.a('object')
        // res.body.should.have.property('message').eql('failed to send email')
        return done()
      })
  })
})

/**
 * PUT request test
 * 
 */
describe('PUT /resetPassword', () => {
  it('givenTokenAndPassword_whenProper_shouldResetPassword', (done) => {
    const userData = userInputs.user.userResetPasswordPos
    const userToken = userInputs.user.userResetPasswordToken
    chai.request(server)
      .put('/resetPassword')
      .set('token', userToken)
      .send(userData)
      .end((error, res) => {
        if (error) {
          return done(error)
        }
        //  res.should.have.status(200)
        // res.body.should.be.a('object')
        // res.body.should.have.property('success').eql(true)
        //  res.body.should.have.property('message').eql('password changed successfully')
        return done()
      })
  })

  it('givenToken_whenEmpty_shouldNotResetPassword', (done) => {
    const userData = userInputs.user.userResetPasswordNeg
    chai.request(server)
      .put('/resetPassword')
      .set('headerParameter', '')
      .send(userData)
      .end((error, res) => {
        if (error) {
          return done('Token should be empty')
        }
        res.should.have.status(400)
        // res.body.should.be.a('object')
        // res.body.should.have.property('message').eql('failed reset the password')
        return done()
      })
  })

  it('givenToken_whenImproper_shouldNotResetPassword', (done) => {
    const userData = userInputs.userResetPasswordPos
    const userToken = userInputs.user.userResetWrongPasswordToken
    chai.request(server)
      .put('/resetPassword')
      .set('token', userToken)
      .send(userData)
      .end((error, res) => {
        if (error) {
          return done('Should pass invalid token')
        }
        res.should.have.status(400)
        // res.body.should.be.a('object')
        // res.body.should.have.property('message').eql('failed reset the password')
        return done()
      })
  })
})






