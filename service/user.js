/**
 * @module       Service
 * @file         service.js
 * @description  Service class holds the callback method for controller 
 * @author       Sanyukta 
 * @since        29/7/2021  
***********************************************************************************************/

const model = require('../models/user');
const bcrypt = require('bcryptjs');
const helper = require('../middleware/helper');
const {sendingEmail} = require('../utility/user');
const logger = require('../logger/logger');


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
    try{
       model.forgotPassword(userDetails, (error, data) => {
        //    console.log(data);
           if (data){
               const emailData = {
                email: data.email,
                _id: data._id,
               };
            error ? callback(error, null): callback(null, sendingEmail(emailData));   
           }else{
               callback('This email id does not exist')
           }
       })
    }catch(error){
        return error;
    }
}

passwordReset = (userInput, callback) => {
    const  email = helper.getEmailFromToken(userInput.token)
    const  inputData = {
        email: email,
        password: userInput.password
    }

    model.updatePassword(inputData, (error, data) =>{
        if(error){
            logger.error("Some error occured while updating password", error)
            callback(error, null)
         }else{
            logger.info("Password has been reset successfully", data)
            callback(null, data)
         } 
    })
}
  
}
module.exports = new Service(); 