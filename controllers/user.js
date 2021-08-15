/**
 * @description   : Taking the request from the client and gives the response 
 * @author        : sanyukta
*/

const service = require('../service/user');
const {validateSchema, forgotPasswordValidation,resetPasswordValidation} = require('../middleware/user');
const logger = require("../logger/logger");
const model = require('../models/user');
const { constants } = require('fs');
// const { data } = require('../logger/logger');
// const { messageData } = require('../middleware/messageData');
class Controller{
    /**
     * @description Create and save user and sending response to service
     * @method register to save the user
     * @param req,res for service
     */
    register = (req, res) => {
        // Validate request
        const validation = validateSchema.validate(req.body)
        if(validation.error){
            res.status(400).send({message: validation.error.details[0].message})
        }

        // Create an employee
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        }
        
        service.createDetails(user, (error,data) => {
            if(error){
               return  res.status(500).send({success:false, message: "Email already exists", data: null})
            }
            else{
             return res.status(200)
                .send({success: true, message: "user has been successfully registered", data:data})
            }
        })
     }

    /**
     * @description retrieving login info from user by email and password
     * @method login
     * @param req,res for service
     */
     login = (req, res) => {
        const loginData = {
            email: req.body.email,
            password : req.body.password
        }
        service.loginDetails(loginData, (error, token) => {
            if(error){
                // logger.error("Error while authenticating the user", error);
                return res.status(400).send({success: false, message: "unsuccessful"})
            }
            else{
                // logger.error("authenticating the user", error);
                return res.status(200).send({success: true, message: "Successfully Logged In"
                , token: token})
            }
        })
        
     }

 
 /**
     * description controller function for forgot password
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    
  forgotPassword = (req, res) =>{
    try{
     const userData = {
         email: req.body.email,
     };
     console.log("email found controller", userData)
     service.forgotPassword(userData, (error, data) => {
        console.log( "controller call back", userData)
        if (error) {
            logger.error("Error on finding mailID",error);
         return res.status(400).send({
             success: false,
             message: error
         });
        }
        
         logger.info("email found and sent link successfully",data);
         return res.status(200).send({
             success: true,
             message: "Link sent successfully",
             data
         });
     });
    }catch(error){
        return res.status(500).send({
            sucess: false,
            message: error.message
        });
    } 
  }
  
/**
     * description controller function for forgot password
     * @param {*} req
     * @param {*} res
     * @returns
     */

resetPassword = (req, res) => {
    try {    
      const userData = {
        token: req.headers.token,
        password: req.body.password,
        confirmPassword: req.body.password,
      };
      service.passwordReset(userData, (error, data) => ((error) ? res.status(400).send({
        sucess: false,
        message: error,
      })
     : res.status(200).send({
          success: true,
          message: 'Your password has been reset successfully!!',
          data,

        })));
    } catch (error) {
      return res.status(500).send({
        sucess: false,
        message: error.message,

      });
    }
  }
 }
      
module.exports = new Controller();