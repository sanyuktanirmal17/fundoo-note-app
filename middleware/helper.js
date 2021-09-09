
/**
 * @module       Helper
 * @file         helper.js
 * @description  Helper class holds the jwt token data 
 * @author       Sanyukta 
**************************************************************/
const { loginDetails, userDetails, forgotPassword } = require('../models/user');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const logger = require('../logger/logger');
const { required } = require('joi');
const { data } = require('../logger/logger');

class Helper{

    /**
     * @description function to create a token for authentication of user
     * @param {*} loginData
     * @returns 
     */
   createToken = (loginData) => {
        return jwt.sign(loginData, process.env.SECRET_TOKEN, {
            expiresIn: "24h"});
    
      }
     
    generatToken = (data) => {
        const token =  jwt.sign({ 
          email: data.email,
           id: data._id },
           process.env.SECRET_TOKEN, { expiresIn: "24h" });
        console.log(data);
        return token
        }

        generateTokenForUser = (data) =>{
          const tokenUser = {
            email: data.email,
             id: data._id }
           return  jwt.sign({tokenUser}, process.env.SECRET_TOKEN, { expiresIn: "24h" });
    
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
            get('token', (err, token) => {
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

    /**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @description : redisMiddleWare is the middle ware of the redis.
 */
 redisMiddleWare = (req, res, next) => {
  client.get('note', (err, note) => {
    if (err) {
      throw err;
    } else if (note) {
      res.send(JSON.parse(note));
    } else {
      next();
    }
  });
};

/**
 *
 * @param {*} KEY
 * @param {*} value
 * @description : here we have set the key and value in redis function
 */
 redisFunction = (KEY, value) => {
  client.setex(KEY, 1200, JSON.stringify(value));
};

/**
 * token verification for crud operation 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
    verifyingToken = (req, res, next) => {
      let token = req.get('token')
      try {
        if (token) {
          jwt.verify(token, process.env.SECRET_TOKEN, error => {
            if (error) {
              return res.status(400).send({ success: false, message: 'Invalid Token' })
            } else {
              next()
            }
          })
        } else {
          return res.status(401).send({ success: false, message: 'Authorisation failed! Invalid user' })
        }
      } catch (error) {
        return res.status(500).send({ success: false, message: 'Something went wrong!' })
      }
    }

    verifyTokenUser = (token)=>{
      const data = jwt.verify(token,process.env.SECRET_TOKEN);
      if(data){
          return data;
      }
      else{
         return "couldnt verify" ;
      }
 }

//  validateToken = (req,res,next)=>{
//   try{
//       const header = req.headers.token;
//       // const myArr = header.split(" ");
//       // const token = myArr[1];
//       const decode = jwt.verify(req.headers.token, process.env.JWT);
//             get('token', (err, token) => {
//               if (err) throw err;
//               if (req.headers.token === token) {
//                 req.userData = decode;
//                 const userId = decode.id;
//               }
//       const verify = jwt.verify({header}token,process.env.ACCESS_TOKEN_KEY);
//       if(verify){
//           next();
//       }
//       else{
//           return  res.status(400).send({
//               message:"Invalid Token",
//               success:false
//           })
//       }
//   }catch{
//       return  res.status(400).send({
//           message:"Invalid Token",
//           success:false
//       })
//   }

// }
         
}

module.exports = new Helper();