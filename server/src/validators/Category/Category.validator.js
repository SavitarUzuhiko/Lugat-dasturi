const {body,param} = require('express-validator');
class CategoriesValidator {
  static addCategory() {
    return [
      body('name').notEmpty().withMessage('Name is required'),
      body('name').isString().withMessage('Name must be a string'),
      body('dictionary').notEmpty().withMessage('Dictionary is required'),
      body('dictionary').isMongoId().withMessage('Dictionary is not valid'),
      body('department').notEmpty().withMessage('Department is required'),
      body('department').isMongoId().withMessage('Department is not valid'),
    ];
  }

  static getCategory() {
    return [
      body('page').optional().isInt().withMessage('Page must be an integer'),
      body('limit').optional().isInt().withMessage('Limit must be an integer'),
      body('dict').optional().isMongoId().withMessage('Dictionary is not valid'),
      body('dep').optional().isMongoId().withMessage('Department is not valid'),
      body('search').optional().isString().withMessage('Search must be a string'),
    ];
  }

  static deleteCategory() {
    return [param('id').isMongoId().withMessage('Id is not valid')];
  }

  static updateCategory() {
    return [
      param('id').isMongoId().withMessage('Id is not valid'),
      body('name').optional().isString().withMessage('Name must be a string'),
      body('dictionary').optional().isMongoId().withMessage('Dictionary is not valid'),
      body('department').optional().isMongoId().withMessage('Department is not valid'),
    ]
  }
}

module.exports = CategoriesValidator