
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

        /**
         * verify token for CRUD Operation
         * @param {*} req 
         * @param {*} res 
         * @param {*} next 
         */
         
        verifyToken = (req, res, next) => {
          try {
            const decode = jwt.verify(req.headers.token, process.env.JWT);
            client.get('token', (err, token) => {
              if (err) throw err;
              if (req.headers.token === token) {
                req.userData = decode;
                const userId = decode.id;
              }
              next();
            });
          } catch (error) {
            res.status(401).send({
              error: 'Your token has expiered',
            });
          }
        };


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

    // authenticateToken(req, res, next) {
    //   const token = req.headers.authorization;
    //   if (token) {
    //       jwt.verify(token.split(" ")[1], process.env.SECRET_TOKEN, (err) => {
    //           if (err) {
    //               return res.status(500).send({
    //                   success: false,
    //                   message: err.message || 'Failed To Authenticate Token!',
    //               });
    //           } else {
    //               next();
    //           }
    //       });
    //   } else {
    //       return res.status(401).send({
    //           success: false,
    //           message: 'Unauthorized User!',
    //       });
    //   }
    // }

     verifyingToken = (req, res, next) => {
      const token = req.get('token')
      try {
        if (token) {
          jwt.verify(token, process.env.SECRET_TOKEN, error => {
            if (error) {
              return res.status(400).send({ 
                success: false, 
                message: 'Invalid Token' })
            } else {
              next()
            }
          })
        } else {
          return res.status(401).send({
             success: false,
              message: 'Unauthorized user' })
        }
      } catch (error) {
        return res.status(500).send({ 
          success: false, 
          message: 'statement missing ' })
      }
    
    }

    //  verifyToken = (req, res, next) => {
    //   try {
    //     const decode = jwt.verify(req.headers.token, process.env.JWT);
    //     client.get('token', (err, token) => {
    //       if (err) throw err;
    //       if (req.headers.token === token) {
    //         req.userData = decode;
    //         const userId = decode.id;
    //       }
    //       next();
    //     });
    //   } catch (error) {
    //     res.status(401).send({
    //       error: 'Your token has expiered',
    //     });
    //   }
    // };
         
}

module.exports = new Helper();