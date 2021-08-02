const chai = require('chai')
const chaiHttp = require('chai-http')
const { object } = require('joi')
const server = require('../server')

chai.should ()
chai.use(chaiHttp)

describe('Tests api', () => {
    /* 
    POST API test for login
    */
    describe('POST /login', () => {
        it("It should post login details", (done) => {
            const loginData = employeeData.login
            chai.request(server)
                .post("/login")
                .send(loginData)
                .end((error, res) => {
                    // console.log(res);
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Successfully Logged In")
                    res.body.should.have.property("token");
                done()
            })
        }) 
    })
    
    /* 
    POST API negative test for login
    */
    it("It should not post login details", (done) => {
        const loginDataNegative = employeeData.loginNegative
        chai.request(server)
            .post("/login")
            .send(loginDataNegative)
            .end((error, res) => {
                // console.log(res);
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property("success").eql(false);
                res.body.should.have.property("message").eql("Invalid Credentials")
                res.body.should.have.property("token").eql(null)
            done()
        })
    })
})

/* 
    POST API test for registeration
    */
    describe('POST /register', () => {
        it("It should post register details", (done) => {
            const registerData = employeeData.register
            chai.request(server)
                .post("/register")
                .send(registerData)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property("success").eql(true);
                    res.body.should.have.property("message").eql("Employee has been successfully registered")
                    res.body.should.have.property("data").should.be.a('object');    
                done()
            })
        }) 
        
        /* 
        POST API negative test for registeration
        */
        it("It should not post register details", (done) => {
            const registerDataNegative = employeeData.registerNegative
            chai.request(server)
                .post("/register")
                .send(registerDataNegative)
                .end((error, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property("success").eql(false);
                    res.body.should.have.property("message").eql("Email already exists")
                    res.body.should.have.property("data").eql(null);    
                done()
            })
        })

        it("Given valid details except firstname It should not post register details", (done) => {
            const registerDataWithoutFirstName = employeeData.registerWithoutFirstName
            chai.request(server)
                .post("/register")
                .send(registerDataWithoutFirstName)
                .end((error, res) => {
                    // console.log(res)
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property("message").eql('\"firstName\" is not allowed to be empty')
                done()
            })
        })

        it("Given valid details except lastname It should not post register details", (done) => {
            const registerDataWithoutLastName = employeeData.registerWithoutLastName
            chai.request(server)
                .post("/register")
                .send(registerDataWithoutLastName)
                .end((error, res) => {
                    // console.log(res)
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property("message").eql('\"lastName\" is not allowed to be empty')
                done()
            })
        }) 
    })
