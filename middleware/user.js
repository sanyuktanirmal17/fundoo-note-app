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



  const notesCreationValidation = Joi.object({
    title: Joi.string()
      .required(),
  
    description: Joi.string()
      .required(),
  });
  
  
  const labelValidation = Joi.object({
    labelName: Joi.string()
    .required(),
  });
  
  
  
  const addingRemovingLabelValidation = Joi.object({
    notesId: Joi.string()
    .required(),
  
    labelId: Joi.string()
    .required(),
  });

  // const notesValidation = Joi.object({
  //   title: Joi.string()
  //     .required(),
  
  //   description: Joi.string()
  //     .required(),
  // });

  // const labelValidation = joi.object({
    // labelName: joi.string().required()
// });

// const addRemoveLabelValidation = joi.object({
//   noteId: joi.string().required(),
//   labelId: joi.string().required()
// }) 

  
module.exports = { validateSchema, forgotPasswordValidation, resetPasswordValidation,  notesCreationValidation ,
  labelValidation,addingRemovingLabelValidation 
  
};


