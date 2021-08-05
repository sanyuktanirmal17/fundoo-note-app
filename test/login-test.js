// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const server = require('../server')
// const userdata= require('./data.json')

// chai.should ()
// chai.use(chaiHttp)

//     /* 
//     POST API test for login
//     */
//     describe('POST ./login', () => {
//         it(" post_login_details", (done) => {
//             const loginData = userdata.data.login
//              chai.request(server)
//                 .post('/login')
//                 .send(loginData)
//                 .end((error, res) => {
//                     res.should.have.status(200)
//                 done()
//             })
//         }) 
  

//     /* 
//     POST API negative test for login
//     */
//     // it("It_should_not_post_login_details", (done) => {
//     //     const loginDataNegative = userdata.data.loginNegative
//     //     chai.request(server)
//     //         .post("/login")
//     //         .send(loginDataNegative)
//     //         .end((error, res) => {
//     //          console.log(res);
//     //         done()
//     //     })
//     //  })
//     it("givenLoginDetails_whenImproper_impropperPassword", (done) => {
//         const loginData = userdata.data.loginWithImproperepassword
//         chai.request(server)
//             .post("/login")
//             .send(loginData)
//             .end((error, res) => {
//             res.should.have.status(400)
//             done()
//         })
//      })

//      it("givenLoginDetails_whenImproper_impropperEmail", (done) => {
//         const loginData = userdata.data.loginWithImproperEmail
//         chai.request(server)
//             .post("/login")
//             .send(loginData)
//             .end((error, res) => {
//             res.should.have.status(400)
//             done()
//         })
//      })
// }) 
