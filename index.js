const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const userController = require("./Controllers/UserController.js");
const authController = require("./Controllers/AuthController.js");

app.use(bodyParser.urlencoded({
    extended: true
}));

var swaggerDefinition = {
    info: {
        title: 'Assignment2_Api',
        description: 'Register,Login and delete user using token and swagger documentation',
        version: '1.0.0'
    },
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'authorization',
            in: 'header',
            scheme: 'bearer',
        }
    },
    host: 'localhost:3003',
    basePath: '/'
};

var swaggerOptions = {
    swaggerDefinition,
    apis: ['./index.js']
};

var swaggerSpecs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));


/**
 * @swagger
 * /registration:
 *  post:
 *   tags:
 *    - Create users
 *   description: Users registration testing
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   parameters:
 *    - name: username
 *      in: formData
 *      type: string
 *      required: true
 *      description: Please provide unique username
 *    - name: password
 *      in: formData
 *      type: string
 *      required: true
 *      description: Please provide unique password
 *   responses:
 *    201:
 *     description: user registered successfully
 *    406:
 *     description: username is required or password is required
 *    409:
 *     description: username already exist
 */

/**
 * @swagger
 * /login:
 *  post:
 *   tags:
 *    - Login users
 *   description: Users login testing
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   parameters:
 *    - name: username
 *      in: formData
 *      type: string
 *      required: true
 *      description: Please provide unique username
 *    - name: password
 *      in: formData
 *      type: string
 *      required: true
 *      description: Please provide unique password
 *   responses:
 *    406:
 *     description: username is required or password is required
 *    404:
 *     description: username doesnt exist
 *    409:
 *     description: incorrect password 
 */

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *   tags:
 *    - Delete users
 *   description: Delete user from token testing
 *   produces:
 *    - application/json
 *   consumes:
 *    - application/x-www-form-urlencoded
 *   security:
 *    - bearerAuth: []
 *   parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: please enter id
 *   responses:
 *    401:
 *     description: unauthorized access
 *    404:
 *     description: users not found
 *    200:
 *     description: user deleted successfully
 *    406:
 *     description: Id not provided
 */

app.post('/registration', userController.Validator, userController.UserExist,
    userController.genHash, userController.Register);
app.post('/login', authController.validation, authController.passwordChecker,
    authController.jwtTokenGen);
app.delete('/users/:id', authController.verifyToken, userController.deleteuser);
app.listen(3003);