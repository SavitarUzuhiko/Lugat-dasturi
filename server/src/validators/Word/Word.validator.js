const {body, param, query} = require('express-validator');

class WordValidator {
  static getWord() {
    return [
      query('page').optional().isInt().withMessage('Page must be an integer'),
      query('limit').optional().isInt().withMessage('Limit must be an integer'),
      query('dict').optional().isMongoId().withMessage('Dictionary is not valid'),
      query('dep').optional().isMongoId().withMessage('Department is not valid'),
      query('ctg').optional().isMongoId().withMessage('Category is not valid'),
      query('search').optional().isString().withMessage('Search must be a string'),
    ]
  }
  static addWord() {
    return [
      body('word').notEmpty().withMessage('Word is required'),
      body('word').isString().withMessage('Word must be a string'),
      body('definition').notEmpty().withMessage('Definition is required'),
      body('definition').isString().withMessage('Definition must be a string'),
      body('category').notEmpty().withMessage('Category is required'),
      body('category').isMongoId().withMessage('Category is not valid'),
      body('image').optional().isURL().withMessage('Image must be a string'),
    ]
  } 

  static deleteWord() {
    return [
      param('id').isMongoId().withMessage('Id is not valid'),
    ]
  }

  static updateWord() {
    return [
      param('id').isMongoId().withMessage('Id is not valid'),
      body('word').optional().isString().withMessage('Word must be a string'),
      body('definition').optional().isString().withMessage('Definition must be a string'),
      body('category').optional().isMongoId().withMessage('Category is not valid'),
      body('image').optional().isString().withMessage('Image must be a string'),
    ]
  }
}

module.exports = WordValidator