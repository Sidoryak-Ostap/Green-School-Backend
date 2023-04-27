

const {body} = require('express-validator');


const CheckValidation = [
    body('email', 'Неправильний email').isEmail(),
    body('password', 'Пароль повинен мінімум 8 символів').isLength({min: 8}),
    body('username',"Ім'я повинно містити мінімум 3 символи").isLength({min: 3})
]

module.exports = {CheckValidation};