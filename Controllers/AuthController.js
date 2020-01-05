const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const users = require("../Models/UserModels.js");
const secret = 'PleiadesIsMySecretKey';

function validation(req, res, next) {
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
        users.findOne({
                where: {
                    username: req.body.username
                }
            })
            .then(function (result) {
                if (result === null) {
                    res.status(404);
                    res.json({
                        status: 404,
                        message: 'username doesnt exist'
                    });
                } else {
                    req.passwordfromdb = result.dataValues.password;
                    req.usernamefromdb = result.dataValues.username;
                    next();
                }
            })
            .catch(function (err) {
                res.json(err);
            })
    }
}

function passwordChecker(req, res, next) {
    bcrypt.compare(req.body.password, req.passwordfromdb)
        .then(function (result) {
            if (result === true) {
                next();
            } else {
                res.status(409);
                res.json({
                    status: 409,
                    message: "incorrect password"
                });
            }
        })
        .catch(function (err) {
            res.json(err);
        })
}

function jwtTokenGen(req, res, next) {
    var myPayload = {
        username: req.usernamefromdb,
        userLevel: 'superadmin'
    }
    jwt.sign(myPayload, secret, {
            expiresIn: "10h"
        },
        function (err, resultToken) {
            console.log(resultToken);
            res.status(200);
            res.json({
                "userToken: ": resultToken
            })
        })
}

function verifyToken(req, res, next) {
    if (req.headers.authorization === undefined) {
        res.status(401);
        res.json({
            status: 401,
            message: "unauthorized access"
        });
    }
    var token = req.headers.authorization;
    token = token.slice(7, token.length).trimLeft();
    jwt.verify(token, secret,
        function (err, result) {
            console.log(err, result);
            if (result) {
                console.log("correct token");
                next();
            }
            if (err) {
                res.json({
                    err
                });
            }
        })
}

module.exports = {
    validation,
    passwordChecker,
    jwtTokenGen,
    verifyToken
}