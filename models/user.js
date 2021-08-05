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
    }
},{
    timestamps: true
})
userSchema.pre("save", async function(next){
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
    createDetails =(userdetails, callback) => {
        const empSchema = new user({
            firstName: userdetails.firstName,
            lastName: userdetails.lastName,
            email: userdetails.email,
            password: userdetails.password,
            confirmPassword: userdetails.confirmPassword
        });
        empSchema.save(callback)
    };

    /**
     * @description login user from the database
     * @param loginData 
     * @param callback for service
     */
    loginDetails = (loginData, callBack) => {
        user.findOne({email: loginData.email},(error, data) => {
            if(error){
                return callBack(error, null);
            }else if(!data){
                return callBack("Invalid Credentials", null);
            }
            return callBack(null, data);
        })
    }
}

module.exports = new Model();