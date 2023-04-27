

const {body} = require('express-validator');


const LoginValidation = [
    body('email', 'Неправильний email').isEmail(),
    body('password', 'Пароль повинен мінімум 8 символів').isLength({min: 8}),
]

module.exports = {LoginValidation};