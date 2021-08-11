
/**
 * @module       Helper
 * @file         helper.js
 * @description  Helper class holds the jwt token data 
 * @author       Sanyukta 
**************************************************************/
const { loginDetails, userDetails } = require('../models/user')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const logger = require('../logger/logger')

class Helper{

    /**
     * @description function to create a token for authentication of user
     * @param {*} loginData
     * @returns 
     */
   createToken = (loginData) => {
        return jwt.sign(loginData, process.env.SECRET_TOKEN, {
            expiresIn: "3000000s"});

      }
     
    tokenChecker = (data) => {
        return  jwt.sign({ email: data.email, id: data._id }, process.env.SECRET_TOKEN, { expiresIn: "3000000s" });
        // console.log(data)
        }

    

    /*
     * @description function compares with user password and bcrypted password stored in database
     * @param {*} loginPassword 
     * @param {*} databasePassword
     * @returns 
     */
    bcryptAuthentication = (loginPassword, databasePassword) => {
        let result = bcrypt.compareSync(loginPassword, databasePassword)
        return (loginPassword && databasePassword) ? result : false;
    }
    
    // /**
    //  * @description function checks and validates the user token and authorises only if token is correct
    //  * @param {*} req
    //  * @param {*} res 
    //  * @param {*} next 
    //  * @returns 
    //  */
    // tokenChecker(req, res, next) {
    //     let token = req.get('token');
    //     if(token)
    //     return (token) ?
    //        jwt.verify(token, process.env.SECRET_TOKEN, error => {
    //         return (error) ? res.status(400).send({success: false, message: "Invalid Token"}) : next();
    //         }) :
    //     res.status(401).send({success: false, message: "Authorisation failed! Invalid user"});
    // }

    checkToken(req, res, next){
        let token = req.get('token');
        return(token)?
        jwt.verify(token, SECRET_KEY, error =>{
            return (error) ? res.status(400).send({message: "Invalid Token"}):next();
        }) : 
        res.status(401).send({message: "Missing token! Unauthorized User!"})
    }
}

module.exports = new Helper();