const User = require('../models/user.model');

// Lấy thông tin người dùng
exports.getCustomer = (req, res) => {
  User.getCustomer((err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving user', error: err });
    }
    if (!user) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(user);
  });
};

const Joi = require('joi');

exports.createUser = (req, res) => {
  const schema = Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'teacher', 'student').required()
  });

  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Dữ liệu không hợp lệ', error: error.details[0].message });
  }

  const newUser = value; // value chứa các trường đã được validate
  User.createUser(newUser, (err, result) => {
    if (err) {
      return res.status(400).json({ message: 'Error creating user', error: err.message });
    }
    res.status(201).json({
      message: 'User created successfully',
      user: result
    });
  });
};