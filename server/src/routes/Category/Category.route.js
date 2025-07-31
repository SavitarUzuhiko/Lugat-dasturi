const router = require('express').Router();
const CategoryController = require('../../controllers/Category');
const { CategoryValidator, expressvalidate } = require('../../validators');
const authMiddleware = require('../../middlewares/auth.middleware');

router.post(
  '/add',
  CategoryValidator.addCategory(),
  expressvalidate,
  CategoryController.addCategory
);
router.get(
  '/all',
  CategoryValidator.getCategory(),
  expressvalidate,
  CategoryController.getCategory
);
router.delete(
  '/delete/:id',
  CategoryValidator.deleteCategory(),
  expressvalidate,
  CategoryController.deleteCategory
);
router.put(
  '/update/:id',
  CategoryValidator.updateCategory(),
  expressvalidate,
  CategoryController.updateCategory
);

module.exports = router;
