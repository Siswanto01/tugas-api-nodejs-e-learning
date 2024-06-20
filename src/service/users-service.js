const { registerUserValidation, loginUserValidation } = require('../validation/users-validation.js');
const ResponseError = require("../error/response-error.js");
const { validate } = require('../validation/validation.js');
const models = require('../models/index.js');   
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const register = async (request) => {
    const user = validate(registerUserValidation, request);
    
    const existingUser = await models.user.findOne({ where: { email: user.email } });

    if (existingUser) {
        throw new ResponseError(400, "User already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);
    
    // Correct way to create a new user
    const newUser = await models.user.create({
        name: user.name,
        email: user.email,
        password: user.password
    });

    return {
        id_user: newUser.id,
        email: newUser.email,
        name: newUser.name
    };
}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await models.user.findOne({
        where: {
            email: loginRequest.email
        },
        attributes: ['id_user', 'email', 'name', 'password']
    });

    if (!user) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if (!isPasswordValid) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const token = jwt.sign({
        id_user: user.id_user,
        email: user.email,
        name: user.name
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
    );

    return {
        message: "Login successful",
        token
    };
}

module.exports = {
    register,
    login
};
