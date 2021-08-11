/**
 * @module       utility
 * @file         user.js
 * @description  it contains the code for nodemailer to send email to user 
 * @author       sanyukta
**********************************************************************************************/
const nodemailer = require('nodemailer');
require('dotenv').config();
const helper = require('../middleware/helper');
const handlebars = require('ejs');
const fs = require("fs");
const logger = require("../logger/logger")


/**
 * @description used to send email to the user 
 * @param {*} email
 * @param {*} subject 
 * @param {*} link 
 * @returns 
 */
const sendingEmail  = (data) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
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
     
        handlebars.renderFile('utility/email.ejs', (error, data) => {
            if (error) {
              logger.log('error', error)
            } else {
              const message = {
                from: process.env.EMAIL,
                to: data.email,
                subject: 'subject',
                html: `${data}<a href="${'http://localhost:6000/resetPassword/'}$tokenChecker(data)}">Touch</a>`
              }

              transporter.sendMail(message, (error, info) => {
                const sendInfo = error ? logger.log('error', error) : logger.log('info', info)
                return sendInfo
              })
            }
        })
    }


module.exports = {sendingEmail};

