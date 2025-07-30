const { body , query, param} = require('express-validator');

class DictionaryValidator {
  static addDictionary() {
    return [
      body('status')
        .notEmpty().withMessage('Status is required')
        .isIn(['historical', 'futuristic']).withMessage('Status is not valid'),
      body('word')
        .notEmpty().withMessage('Word is required')
        .isString().withMessage('Word must be a string')
        .isLength({ min: 1 }).withMessage('Word must not be empty if provided'),
      body('definition')
        .optional()
        .isString().withMessage('Definition must be a string')
        .isLength({ min: 1 }).withMessage('Definition must not be empty if provided'),
      body('image')
        .optional()
        .isURL().withMessage('Image must be a string')
        .isLength({ min: 1 }).withMessage('Image must not be empty if provided'),
    ];
  }
  static getDictionary(){
    return [
      query('type')
        .optional()
        .isIn(['historical', 'futuristic','']).withMessage('Status is not valid'),
      query('search')
        .optional()
        .isString().withMessage('Search must be a string')
        .isLength({ min: 1 }).withMessage('Search must not be empty if provided')
    ]
  }

  static updateDictionary(){
    return [
      param('id')
        .isMongoId().withMessage('Id is not valid'),
      body('status')
        .optional()
        .isIn(['historical', 'futuristic']).withMessage('Status is not valid'),
      body('word')
        .optional()
        .isString().withMessage('Word must be a string')
        .isLength({ min: 1 }).withMessage('Word must not be empty if provided'),
      body('definition')
        .optional()
        .isString().withMessage('Definition must be a string')
        .isLength({ min: 1 }).withMessage('Definition must not be empty if provided'),
      body('image')
        .optional()
        .isString().withMessage('Image must be a string')
        .isLength({ min: 1 }).withMessage('Image must not be empty if provided'),
    ]
  }
}

module.exports = DictionaryValidator;
