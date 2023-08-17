const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const generateToken = _id => {
  const jwtKey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtKey, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (user)
      return res.status(400).json({
        status: '400',
        message: 'User with the given email already exists.',
      });

    if (!name || !email || !password)
      return res.status(400).json({
        status: '400',
        message: 'All fields are required.',
      });

    if (!validator.isEmail(email))
      return res.status(400).json({
        status: '400',
        message: 'Please enter valid email.',
      });

    user = new userModel({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = generateToken(user._id);

    user = await userModel.findOneAndUpdate({ _id: user._id }, { token: token }, { new: true });

    res.status(200).json({
      message: 'Registered successfully',
      userData: user,
    });
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (!user)
      return res.status(400).json({
        status: '400',
        message: 'Invalid email or password.',
      });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.status(400).json({
        status: '400',
        message: 'Invalid email or password.',
      });

    const token = generateToken(user._id);

    user = await userModel.findOneAndUpdate({ _id: user._id }, { token: token }, { new: true });

    res.status(200).json({
      message: 'Login successfully',
      userData: {
        _id: user._id,
        token,
      },
    });
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { user } = res.locals;

    res.status(200).json({
      message: 'successful',
      userData: user,
    });
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json({
      message: 'successful',
      userData: users,
    });
  } catch (e) {
    res.status(500).json({
      message: e,
    });
  }
};

module.exports = { registerUser, loginUser, getUserDetails, getAllUsers };
