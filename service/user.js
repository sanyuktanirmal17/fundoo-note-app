/**
 * @module       Service
 * @file         service.js
 * @description  Service class holds the callback method for controller 
 * @author       Sanyukta 
 * @since        29/7/2021  
***********************************************************************************************/

const model = require('../models/user')
const tokenModel = require("../models/token.js");
const bcrypt = require('bcryptjs')
const helper = require('../middleware/helper')
const logger = require('../logger/logger');
const { data } = require('../logger/logger');
const crypto = require("crypto");
const email = require("../middleware/email/email")
class Service {
    /**
     * @description Create and save user then send response to controller
     * @method createDetails to save the user
     * @param callback callback for controller
     */
    createDetails = (user, callback) => {
        model.createDetails(user, (error, data) => {
            //  return error ? callback(error, null) : callback(null, data)
            if(error){
                logger.error("Error while registering the new user", error);
                return callback(error, null); 
            }else {
                logger.info("User registered successfully!", data);
                return callback(null, data);
            }
        });
    }

    /**
     * @description sends the info to loginApi in the controller
     * @method loginDetails
     * @param callback callback for controller
     */
     loginDetails = (loginData, callback) => {
        model.loginDetails(loginData, (error, data) => {
            if(error){
                 logger.error("Error while registering the new user", error);
                return callback(error, null)
            }
            if(helper.bcryptAuthentication(loginData.password, data.password)){
                //  logger.info("Token is generated", helper.createToken({loginData});
                const token = helper.createToken({loginData})
                if(token)
                {
                    logger.info("Token generated",token)
                    return callback(null, token)
                }else{
                    logger.error("Token not generated",erroe)
                    return callback(error, null)  
                }
                //  return (token) ? callback(null, token) : callback(error, null)  
            }else{
           logger.error("Please enter a valid password", error);
                return callback("Incorrect Password", error)
            }
               
        })
    }

    forgotPassword = (userDetails, callback) => {
        model.forgotPassword(userDetails, (error, data) => {
          if (error) {
            logger.error("Error while finding user by email", error);
            callback(error, null);
          } else {
            if (data === null) {
              logger.info("User does not exist", data);
              callback("User does not exist", null);
            } else {
              tokenModel.findTokenByUserId(data._id, (tokenError, tokendata) => {
                if (tokenError) {
                  logger.error("Error while finding token by user id", error);
                  callback(tokenError, null);
                }
                });
            
                // } else {
                //   if (tokendata) {
                //     tokenModel.deleteTokenByUserId(tokendata.userId, (tokenDeleteErr, tokenDeleteSuccess) => {
                //       if (tokenDeleteErr) {
                //         logger.error("Error while deleting the token by user id", error);
                //         callback(tokenDeleteErr, null);
                //       } else {
                //         logger.info("Token deleted");
                //       }
                //      });
                //    }
                // }
             
        //       let resetToken = crypto.randomBytes(32).toString("hex");
        //       const hash = bcrypt.hash(resetToken, Number(process.env.SALT_ROUNDS));
        //       tokenModel.saveToken(data._id, String(hash), (saveTokenErr, saveTokenSuccess) => {
        //         if (saveTokenErr) {
        //           logger.error("Error while saving the token", err);
        //           callback(saveTokenErr, null);
        //         } else {
        //           // const link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${doc._id}`;
        //           callback(null, link);
        //         }
        //       });
           }
           } 
        });
      };
}
module.exports = new Service(); 