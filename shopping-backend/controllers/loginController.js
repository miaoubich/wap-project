const User = require('../models/login');

exports.fetchById = (req, res, next) => {
    res.status(200).json(User.getUserById(req.params.userId));
}

exports.fetchByUsernameAndPassword = (req, res, next) => {
    res.status(200).json(User.getUsernameByUsernameAndPassword(req.query.username, req.query.password));
}

exports.fetchAll = (req, res, next) => {
    res.status(200).json(User.getAll());
}