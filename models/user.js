/**
 * /**
 * @module       Model
 * @file         user.js
 * @description Taking the request from the client and gives the response
 * @author       Sanyukta
 * @since        29/7/2021  
-----------------------------------------------------------------------------------------------*/
 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const logger = require("../logger/logger");
// const sendEmail = require('../../util/mailGun')
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required : true      
    },
    lastName: {
        type: String,
        required : true      
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    // resetLink:{
    //     data:String,
    //     default:''
    // }
},{
    timestamps: true
})

userSchema.pre('save', async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 8)
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, 8)
    }
    next();
})
const user = mongoose.model('user', userSchema)
class Model {
    /**
     * @description register user in the database
     * @param user
     * @param callback 
     */
    createDetails = (userdetails, callback) => {
        const empSchema = new user({
            firstName: userdetails.firstName,
            lastName: userdetails.lastName,
            email: userdetails.email,
            password: userdetails.password,
            confirmPassword: userdetails.confirmPassword
        });

        empSchema.save({},(error,data)=>{
            return (error) ? callback(error,null) : callback(null,data)
            }
        )
    };
 
    /**
     * @description login user from the database
     * @param loginData 
     * @param callback for service
     */
    loginDetails = (loginData, callBack) => {
     user.findOne({email: loginData.email},(error, data) => {
            if(error){ 
                logger.error("Error while login", error);
                return callBack(error, null);
            }else if(!data){
                logger.info("Email is matched", null);
                return  callBack("Invalid Credentials", null);
            }
            logger.info("Details login", data);
           return callBack(null, data);
        })
    }

/**
     * @description mongoose function for forgot password
     * @param {*} email
     * @param {*} callback 
     */
 forgotPassword = (data, callback) => {
    user.findOne({email : data.email}, (error, data) => {
        console.log("email model",data);
        logger.error("email not found", error);
        return error ? callback(error, null):
        !data ? callback("email not found", null):
        callback(null, data)
    });
}

/**
     * @description mongooose method for reseting the password
     * @param {*} inputData
     * @param {*} callback
     * @returns
     */
 updatePassword = async (inputData, callback) => {
    try {
      const data = await user.findOne({ email: inputData.email });
      const hash = bcrypt.hashSync(inputData.password, 10, (error, hashPassword) => error || hashPassword);
      user.findByIdAndUpdate(data._id, { password: hash }, (error, data) => 
      (error ? callback(error, null) : callback(null, data)));
    } catch (error) {
      return callback(error, null);
    }
  }

}
module.exports = new Model();