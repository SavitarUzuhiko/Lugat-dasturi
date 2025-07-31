const {body} = require('express-validator');

class AuthValidator {
  static registr () {
    return [
      body('email').notEmpty().withMessage('Email is required'),
      body('email').isEmail().withMessage('Email is not valid'),
      body('password').notEmpty().withMessage('Password is required'),
      body('password').isString().withMessage('Password must be a string'),
      body('password').isLength({ min: 8}).withMessage('Password must be at least 8 characters'),
    ];
  }
}

module.exports = AuthValidator;