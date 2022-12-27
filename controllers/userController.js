const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getUserWithId = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.currentUser._id });

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
};

const addUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const role = req.body.role;
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        name: name,
        password: hashedPassword,
        role: role,
      });
      return user.save();
    })
    .then((result) => {
      res.status(200).json("Successfully saved user" + result);
    })
    .catch((err) => {
      res.status(404).json("Error for save data" + err);
    });
};
module.exports = {
  getUser,
  addUser,
  getUserWithId,
};
