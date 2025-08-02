const router = require('express').Router();
const AuthController = require('../../controllers/Auth');
const { AuthValidator, expressvalidate } = require('../../validators');
const authMiddleware = require('../../middlewares/auth.middleware');

router.post('/registr', AuthValidator.registr(), expressvalidate, AuthController.register);
router.post('/login', AuthController.login);
router.get('/activate/:id', AuthController.activate);
router.post('/logout', AuthController.logout);
router.get('/me', authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});



module.exports = router;