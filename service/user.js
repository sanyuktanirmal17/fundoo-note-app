/**
 * @module       Service
 * @file         service.js
 * @description  Service class holds the callback method for controller 
 * @author       Sanyukta 
 * @since        29/7/2021  
***********************************************************************************************/

const model = require('../models/user')
const bcrypt = require('bcryptjs')
const helper = require('../middleware/helper')
const logger = require('../logger/logger')
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
                callback(error, null); 
            }else {
                logger.info("User registered successfully!", data);
                callback(null, data);
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
                 logger.info("Token is generated", helper.createToken(data));
                const token = helper.createToken({loginData})
                 return (token) ? callback(null, token) : callback(error, null)  
            }else{
                  logger.error("Please enter a valid password", error);
                return callback("Incorrect Password", error)
            }
               
        })
    }
}
module.exports = new Service(); 