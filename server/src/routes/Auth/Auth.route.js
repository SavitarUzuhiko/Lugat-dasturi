const router = require('express').Router();
const AuthController = require('../../controllers/Auth');
const { AuthValidator, expressvalidate } = require('../../validators');

router.post('/registr', AuthValidator.registr(), expressvalidate, AuthController.register);
router.post('/login', AuthController.login);
router.get('/activate/:id', AuthController.activate);
router.post('/logout', AuthController.logout);

module.exports = router;