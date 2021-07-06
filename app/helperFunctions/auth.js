const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require("email-validator");
const constants = require('../../constants');

const validateEmail = email => {

    // returns true when validate else false.
    return validator.validate(email);
};

const encryptPassword = plainPassword => {
    const saltRounds = 10; 

    // returns encrypted password
    return bcrypt.hashSync(plainPassword, saltRounds);
};

const validatePassword = (plainPassword, encryptPassword) => {

    // returns true if validated
    return bcrypt.compareSync(plainPassword, encryptPassword);
};

const generateToken = payload => {

    // return generated token
    return jwt.sign(payload, constants.JWT.TOKEN_SECRET_KEY, {
        expiresIn : constants.JWT.TOKEN_EXPIRY_TIME
    });
};

const verifyToken = token => {
    return new Promise(function(resolve, reject){
        jwt.verify(token, constants.JWT.TOKEN_SECRET_KEY, function(error, payload){
            if(error)
                reject(error);
            else   
                resolve(payload);
        });
    });
};

module.exports = {
    validateEmail,
    encryptPassword,
    validatePassword,
    generateToken, 
    verifyToken
};