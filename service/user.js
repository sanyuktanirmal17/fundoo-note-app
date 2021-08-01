const model = require('../models/user')
const bcrypt = require('bcryptjs')

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
            return error ? callback(error, null) : callback(null, data)
        })
    }
}

module.exports = new Service(); 