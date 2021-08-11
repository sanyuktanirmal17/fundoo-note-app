const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const userdata= require('./data.json')

chai.should ()
chai.use(chaiHttp)

/* 
    POST API test for login
    */
    describe('POST ./login', () => {
        it(" post_login_details_True", (done) => {
            const loginData = userdata.data.login
             chai.request(server)
                .post('/login')
                .send(loginData)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Successfully Logged In")
                    res.body.should.have.property("token");
                done()
            })
        }) 
  

    /* 
    POST API negative test for login
    */
    
    it("givenLoginDetails_whenImproper_impropperPassword_False", (done) => {
        const loginData = userdata.data.loginWithImproperepassword
        chai.request(server)
            .post("/login")
            .send(loginData)
            .end((error, res) => {
            res.should.have.status(400)
            res.should.be.a('object');
            res.body.should.have.property("success").eql(false);
            res.body.should.have.property("message").eql("Invalid credential");
            res.body.should.have.property("token").eql(null);
            done();
        })
     })



     it("givenLoginDetails_whenImproper_impropperEmail", (done) => {
        const loginData = userdata.data.loginWithImproperEmail
        chai.request(server)
            .post("/login")
            .send(loginData)
            .end((error, res) => {
            res.should.have.status(400);
            res.should.be.a('object');
            res.body.should.have.property("success").eql(false);
            res.body.should.have.property("message").eql("Invalid credential");
            res.body.should.have.property("token").eql(null);
            done();
        })
     })
    
    })
/* 
 POST API test for registeration
    */
    describe('POST /register', () => {
        it("It_should_post_register_details", (done) => {
            const registerData = userdata.data.register
            chai.request(server)
                .post("/register")
                .send(registerData)
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql(" successfully registered")
                    res.body.should.have.property("data").should.be.a('object');  
                done();
            })
        }) 
    
    


        it("Given_valid_details_except_firstname_It_should_not_post_register_details", () => {
            const DataWithoutFirstName = userdata.data.WithoutFirstName
            chai.request(server)
                .post("/register")
                .send(DataWithoutFirstName)
                .end((error, res) => {
                 res.should.have.status(422);
                 res.body.should.be.a('object')
                 res.body.should.have.property("message").eql('\"firstName\" is not allowed to be empty')
                
            })
        })

    
       it("Given_valid_details_except_lastname_It_should_not_post_register_details", (done) => {
            const DataWithoutLastName = userdata.WithoutLastName
            chai.request(server)
                .post("/register")
                .send(DataWithoutLastName)
                .end((error, res) => {
                      
                      res.body.should.be.a('object')
                      res.body.should.have.property("message").eql('\"lastName\" is not allowed to be empty')  
                      res.should.have.status(400)
                done();
            })
         })
    })

    


