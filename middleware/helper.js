
/**
 * @module       Helper
 * @file         helper.js
 * @description  Helper class holds the jwt token data 
 * @author       Sanyukta 
**************************************************************/
const { loginDetails, userDetails, forgotPassword } = require('../models/user')

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
     
    generatToken = (data) => {
        const token =  jwt.sign({ email: data.email, id: data._id }, process.env.SECRET_TOKEN, { expiresIn: "3000000s" });
        console.log(data);
        return token
        }

    // generateToken(loginData) {
    //     console.log("input", loginIn)
    //     const token = jwt.sign(loginInput, process.env.SECRET_KEY, {
    //       expiresIn: '3000s',
    //     });
    //     return token;
    //   }

      forgotPasswordToken(loginData) {
        const token = jwt.sign(loginData.toJSON(), process.env.SECRET_TOKEN, {
          expiresIn: '3000s',
        });
        return token;
      }
        
        getEmailFromToken(token){
            const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
            return decoded.email
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
         
}

module.exports = new Helper();