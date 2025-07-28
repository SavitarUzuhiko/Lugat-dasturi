const router = require('express').Router();
const DepartmentController = require('../../controllers/Department');
const { expressvalidate, DepartmentValidator } = require('../../validators');

router.get(
  '/all',
  DepartmentValidator.getDepartment(),
  expressvalidate,
  DepartmentController.getDepartment
);
router.post(
  '/add',
  DepartmentValidator.addDepartment(),
  expressvalidate,
  DepartmentController.addDepartment
);
router.delete(
  '/delete/:id',
  DepartmentValidator.deleteDepartment(),
  expressvalidate,
  DepartmentController.deleteDepartment
);
router.put(
  '/update/:id',
  DepartmentValidator.updateDepartment(),
  expressvalidate,
  DepartmentController.updateDepartment
);

module.exports = router;
