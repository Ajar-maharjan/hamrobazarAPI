const bcrypt = require('bcryptjs');
const users = require('../Models/UserModels.js');

function Validator(req, res, next) {
    if (req.body.username === '') {
        res.status(406);
        res.json({
            status: 406,
            message: 'username is required'
        })
    } else if (req.body.password === '') {
        res.status(406);
        res.json({
            status: 406,
            message: 'password is required'
        })
    } else {
        next();
    }
}

function UserExist(req, res, next) {
    users.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(function (result) {
            if (result === null) {
                next();
            } else {
                res.status(409);
                res.json({
                    status: 409,
                    message: 'username already exist'
                })
            }
        }).catch(function (err) {
            res.json(err);
        })
}

function genHash(req, res, next) {
    var saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (hash) {
            req.hashKey = hash;
            next();
        }
        if (err) {
            res.json(err);
        }
    });
}

function Register(req, res, next) {
    users.create({
            username: req.body.username,
            password: req.hashKey
        })
        .then(function (result) {
            //console.log(result);
            res.status(201);
            res.json({
                status: 201,
                message: 'user registered successfully'
            });
        }).catch(function (err) {
            res.json(err);
        })
}

function deleteuser(req, res, next) {
    if (req.params.id === null || req.params.id === undefined) {
        res.status(404);
        res.json({
            status: 404,
            message: "Id not provided"
        })
    }
    users.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function (result) {
            if (result === 0) {
                res.status(404);
                res.json({
                    status: 404,
                    message: "User not found"
                });
            } else {
                res.status(200);
                res.json({
                    status: 200,
                    message: "user deleted successfully"
                });
            }
        })
        .catch(function (err) {
            res.json(err);
        })
}

module.exports = {
    Validator,
    Register,
    genHash,
    UserExist,
    deleteuser
}