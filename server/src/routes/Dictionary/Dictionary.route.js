const router = require('express').Router();
const DictionaryController = require('../../controllers/Dictionary');
const { DictionaryValidator, expressvalidate } = require('../../validators');

router.get(
  '/',
  DictionaryValidator.getDictionary(),
  expressvalidate,
  DictionaryController.getDictionary
);
router.post(
  '/add',
  DictionaryValidator.addDictionary(),
  expressvalidate,
  DictionaryController.addDictionary
);
router.delete('/delete/:id', DictionaryController.deleteDictionary);
router.put(
  '/update/:id',
  DictionaryValidator.updateDictionary(),
  expressvalidate,
  DictionaryController.updateDictionary
);

module.exports = router;
