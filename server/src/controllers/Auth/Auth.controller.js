const bcrypt = require('bcrypt');
const AuthModel = require('../../models/Auth/Auth.model');
const jwt = require('jsonwebtoken');
const HttpException = require('../../utils/HttpException');
const { jwt_token } = require('../../utils/secret');
const { sendMail } = require('../../utils/mail.service.js');
const secret = require('../../utils/secret');
class Auth {
  static register = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await AuthModel.findOne({ email });
    if (user) throw new HttpException(400, 'User already exists');

    const hash = await bcrypt.hash(password, 10);
    const new_user = await AuthModel.create({ email, password: hash });

    const token = jwt.sign({ id: new_user._id }, jwt_token, {
      expiresIn: '5m',
    });

    await sendMail(email, `${secret.api_url}/auth/activate/${new_user._id}`);

    res.cookie('jwt_token', jwt_token, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
    });
    res.json({ success: true, msg: 'User created successfully', token });
  };
  static activate = async (req, res) => {
    const { id } = req.params;
    const user = await AuthModel.findById(id);
    if (!user) throw new HttpException(404, 'User not found');
    user.isActivate = true;
    await user.save();
    res.redirect(secret.api_url);
  };
  static login = async (req, res) => {
    const { email, password } = req.body;

    const user = await AuthModel.findOne({ email });
    if (!user) throw new HttpException(404, 'Email or password is incorrect');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new HttpException(404, 'Email or password is incorrect');

    const token = jwt.sign({ id: user._id }, jwt_token, {
      expiresIn: '1d',
    });

    res.cookie('jwt_token', jwt_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ success: true, msg: 'User logged in successfully', token });
  };
  static logout = async (req, res) => {
    res.clearCookie('jwt_token');
    res.json({ success: true, msg: 'User logged out successfully'});
  };
}

module.exports = Auth;
