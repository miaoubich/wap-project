const User = require("../models/user");

exports.fetchById = (req, res, next) => {
  res.status(200).json(User.getUserById(req.params.userId));
};

exports.fetchByUsernameAndPassword = (req, res, next) => {
  res
    .status(200)
    .json(
      User.getUsernameByUsernameAndPassword(
        req.body.username,
        req.body.password
      )
    );
};

exports.fetchAll = (req, res, next) => {
  res.status(200).json(User.getAll());
};
