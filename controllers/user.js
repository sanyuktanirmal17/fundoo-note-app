/**
 * @description   : Taking the request from the client and gives the response 
 * @author        : sanyukta
*/

const service = require('../service/user');
const validateSchema = require('../middleware/user');
const logger = require("../logger/logger");
const user = require('../models/user');
const { data } = require('../logger/logger');
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
            res.status(422).send({message: validation.error.details[0].message})
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
                return res.status(200).send({success: true, message: "Successfully Logged In", token: token})
            }
        })
        
     }

     forgotPassword = (req, res) => {
      try {
        const { error, value } = validateForgotPassword .validate(req.body);
        if (error) {
          logger.error(" Email validation failed", error);
          return res.status(400).send({success: false, message: error.details[0].message});
        }
        const userDetails = {
          email: req.body.email,
        };
        service.forgotPassword(userDetails, (error, data) => {
          if (error) {
            logger.error("Error while getting the password reset link", error);
            res.status(500).send({success: false, message: error,
            });
          } else {
            logger.info("User registered successfully!", data);
           res.status(200)    .send({success: true,message: "Password reset link email sent",
              data: data
            });
          }
        });
      } catch (error) {
        logger.error("Error while getting the password reset link", error);
        res.status(500).send({success: false,
          message: "Some error occurred while getting the password reset link"
        });
      }
    };
    }

        
module.exports = new Controller();