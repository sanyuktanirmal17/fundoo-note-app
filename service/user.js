/**
 * @module       Service
 * @file         service.js
 * @description  Service class holds the callback method for controller 
 * @author       Sanyukta 
 * @since        29/7/2021  
***********************************************************************************************/

const model = require('../models/user')
const bcrypt = require('bcryptjs')
const Helper = require('../middleware/helper')

class Service {
    /**
     * @description Create and save user then send response to controller
     * @method createDetails to save the user
     * @param callback callback for controller
     */
    createDetails = (user, callback) => {
        model.createDetails(user, (error, data) => {
            return error ? callback(error, null) : callback(null, data)
        })
    }

    /**
     * @description sends the info to loginApi in the controller
     * @method loginDetails
     * @param callback callback for controller
     */
     loginDetails = (loginData, callback) => {
        model.loginDetails(loginData, (error, data) => {
            if(error){
                return callback(error, null)
            }if(Helper.bcryptAuthentication(loginData.password, data.password)){
                return callback("Incorrect Password", error)
            }else{
                const token = helper.createToken({loginData})
                return (token) ? callback(null, token) : callback(error, null)
            }
           return callback("Incorrect Password", error)    
        })
    }
}
module.exports = new Service(); 