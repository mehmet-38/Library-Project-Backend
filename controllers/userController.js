const User = require("../models/user");

const getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  getUser,
};
