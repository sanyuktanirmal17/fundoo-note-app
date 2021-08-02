/**
 * @description   :  Route the APIs
 * @author        : sanyukta
********************************************************************/


const controller = require('../controllers/user')
module.exports = (app) => {
    
    //api for registration
    app.post('/register',controller.register);

    //api for login
    app.post('/login', controller.login);
}