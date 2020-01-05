const Sequelize = require('sequelize');

const sequelize = new Sequelize('node1', 'root', 'pleiades', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

sequelize.authenticate()
    .then(function (result) {
        //console.log("database connected successfully");
    })
    .catch(function (err) {
        console.log(err);
    })

module.exports = {
    Sequelize,
    sequelize
};