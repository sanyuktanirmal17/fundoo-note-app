/**
 * @module       utility
 * @file         user.js
 * @description  it contains the code for nodemailer to send email to user 
 * @author       sanyukta
**********************************************************************************************/

const nodemailer = require('nodemailer');
require('dotenv').config();
const helper = require('../middleware/helper');
const sendejs = require('ejs');
const fs = require("fs");
const logger = require("../logger/logger")
const jwt = require('jsonwebtoken');
const { info } = require('../logger/logger');

/**
 * @description used to send email to the user 
 * @param {*} email
 * @param {*} subject 
 * @param {*} link 
 * @returns 
 */
const sendingEmail  = (data) => {
  console.log(data)
        const transporter = nodemailer.createTransport({
            //  host: 'smtp.gmail.com',
            service :'gmail',
            //  port: 465,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        }) 

        /**
 * @description   : creating token using jsonwebtoken module
 * @param {data} as data 
 * @module        : jwt
*/
     
        sendejs.renderFile('utility/email.ejs', (error, fileData) => {
          if (error) {
            logger.log('error', error)

          } else {
             console.log('mail id found', process.env.EMAIL);
             console.log("utility",data)
            const message = {
              from: process.env.EMAIL,
                // to: 'sanyuktanirmal17@gmail.com',
                 to : data.email,
              subject: 'subject',
              //  html: `$<a href="${'http://localhost:4000/resetPassword/'}${helper.generatToken(data)}">Touch</a>`
               html: `${fileData}<button><a href="${'http://localhost:4000/resetPassword/'}${helper.generatToken(data)}">Click here</a></button>`
            }

            transporter.sendMail(message, (error, info) => {
              const sendInfo = error ? logger.log('error', error) : logger.log('info', info)
              return sendInfo
            })
    }
});
}

const verifyingToken = (req, res, next) => {
  const token = req.get('token')
  try {
    if (token) {
      jwt.verify(token, process.env.SECRET_TOKEN, error => {
        if (error) {
          return res.status(400).send({ 
            success: false, 
            message: 'Invalid Token' })
        } else {
          next()
        }
      })
    } else {
      return res.status(401).send({
         success: false,
          message: 'Unauthorized user' })
    }
  } catch (error) {
    return res.status(500).send({ 
      success: false, 
      message: 'statement missing ' })
  }
}
 
module.exports = {
  verifyingToken,
  sendingEmail,
  // getEmailFromToken
}

