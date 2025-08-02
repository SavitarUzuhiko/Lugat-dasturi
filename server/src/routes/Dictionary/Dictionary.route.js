const router = require('express').Router();
const DictionaryController = require('../../controllers/Dictionary');
const { DictionaryValidator, expressvalidate } = require('../../validators');
const authMiddleware = require('../../middlewares/auth.middleware');

router.get(
  '/all',
  authMiddleware,
  DictionaryValidator.getDictionary(),
  expressvalidate,
  DictionaryController.getDictionary
);
router.get(
  '/get-one/:id',
  authMiddleware,
  DictionaryValidator.getDictionary(),
  expressvalidate,
  DictionaryController.getDictionaryById
);
router.post(
  '/add',
  authMiddleware,
  DictionaryValidator.addDictionary(),
  expressvalidate,
  DictionaryController.addDictionary
);
router.delete('/delete/:id', authMiddleware, DictionaryController.deleteDictionary);
router.put(
  '/update/:id',
  authMiddleware,
  DictionaryValidator.updateDictionary(),
  expressvalidate,
  DictionaryController.updateDictionary
);

module.exports = router;
