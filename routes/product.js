const express = require('express');
const Products = require('../Model/Product');
const router = express.Router();

router.route("/products")
    .get(function (req, res) {
        Products.find(function (err, foundProducts) {
            if (!err) {
                res.send(foundProducts)
            } else {
                res.send(err);
            }

        });
    });

module.exports = router;