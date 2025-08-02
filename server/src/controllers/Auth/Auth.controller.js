const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthModel = require('../../models/Auth/Auth.model');
const HttpException = require('../../utils/HttpException');
const { jwt_token } = require('../../utils/secret');
const { sendMail } = require('../../utils/mail.service');
const secret = require('../../utils/secret');

class Auth {
  static register = async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await AuthModel.findOne({ email });
    if (existingUser) throw new HttpException(400, 'User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await AuthModel.create({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, jwt_token, {
      expiresIn: '5m',
    });

    await sendMail(email, `${secret.api_url}/auth/activate/${newUser._id}`);

    res.cookie('jwt_token', token, {
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(201).json({
      success: true,
      msg: 'User registered successfully',
      token,
    });
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
    if (!isMatch)
      throw new HttpException(404, 'Email or password is incorrect');

    const token = jwt.sign({ id: user._id }, jwt_token, {
      expiresIn: '1d',
    });

    res.cookie('jwt_token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV === 'production',
    });

    res.json({
      success: true,
      msg: 'User logged in successfully',
      token,
    });
  };

  static logout = async (req, res) => {
    res.clearCookie('jwt_token');
    res.json({ success: true, msg: 'User logged out successfully' });
  };
}

module.exports = Auth;
