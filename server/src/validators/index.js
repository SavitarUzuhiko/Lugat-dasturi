const { validationResult } = require('express-validator');

const expressvalidate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let messages = '';
    errors.array().map((e) => {
      messages += `${e.msg}. `;
    });
    return res.status(400).json({ errors: messages.trim() });
  }
  next();
};

module.exports = {
  expressvalidate,
  DictionaryValidator: require('./Dictionary'),
  DepartmentValidator: require('./Department'),
  CategoryValidator: require('./Category'),
};
