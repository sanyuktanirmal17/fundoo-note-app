const Joi = require('joi');

// joi validation
const validateSchema = Joi.object({
    firstName: Joi.string().min(2).max(15).pattern(new RegExp('^[a-zA-Z]{2,}')).required(),
    lastName: Joi.string().min(2).max(15).pattern(new RegExp('^[a-zA-Z]{2,}')).required(),
    email: Joi.string().email().pattern(new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")).required(),
    password: Joi.string().min(8).max(20).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
}); 

const forgotPasswordValidation = Joi.object({
    email: Joi.string()
      .email().required()
      .pattern(new RegExp
        ("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$")),
  });

  const resetPasswordValidation  = Joi.object({
    password: Joi.string()
      .email().required()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')),
      confirmPassword: Joi.string().valid(Joi.ref('password')).required()
  });


  
module.exports = { validateSchema, forgotPasswordValidation, resetPasswordValidation};


