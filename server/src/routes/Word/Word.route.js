const router = require('express').Router();
const WordController = require('../../controllers/Word');
const { WordValidator, expressvalidate } = require('../../validators');

router.get(
  '/all',
  WordValidator.getWord(),
  expressvalidate,
  WordController.getWord
);
router.post(
  '/add',
  WordValidator.addWord(),
  expressvalidate,
  WordController.addWord
);
router.delete(
  '/delete/:id',
  WordValidator.deleteWord(),
  expressvalidate,
  WordController.deleteWord
);
router.put(
  '/update/:id',
  WordValidator.updateWord(),
  expressvalidate,
  WordController.updateWord
);

module.exports = router;
