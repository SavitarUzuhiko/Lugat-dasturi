const { body, param, query } = require('express-validator');

class DepartmentValidator {
  static addDepartment() {
    return [
      body('name').notEmpty().withMessage('Name is required'),
      body('name').isString().withMessage('Name must be a string'),
      body('dictionary').notEmpty().withMessage('Dictionary is required'),
      body('dictionary').isMongoId().withMessage('Dictionary is not valid'),
      body('image').optional().isString().withMessage('Image must be a string'),
    ];
  }

  static getDepartment() {
    return [
      query('type')
        .optional()
        .isMongoId()
        .withMessage('Status is not valid'),
      query('search')
        .optional()
        .isString()
        .withMessage('Search must be a string')
        .isLength({ min: 1 })
        .withMessage('Search must not be empty if provided'),
    ];
  }

  static deleteDepartment() {
    return [param('id').isMongoId().withMessage('Id is not valid')];
  }

  static updateDepartment() {
    return [
      param('id').isMongoId().withMessage('Id is not valid'),
      body('name').isString().withMessage('Name must be a string'),
      body('image').optional().isURL().withMessage('Image must be a string'),
    ]
  }
}
module.exports = DepartmentValidator;
