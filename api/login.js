

const {Router}  = require('express');
const { validationResult } = require('express-validator');
const {UserModel} = require('../models/userModel.js')
const {LoginValidation} = require('../Validation/loginValidation.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const router = Router();


router.post('/login', LoginValidation, async (req,res) =>{


    try {

        const errors = validationResult(req);

        if(!errors.isEmpty())
        {
            return res.status(404).send(errors.array());
        }
    
        const {email, password} = req.body;
    
        const user = await UserModel.findOne({email: email});
    
        if(!user)
        {
            return res.status(400).send("Невірно вказаний email або пароль");
        }
    
        const userPass = await bcrypt.compare(password, user.passwordHash);
            
    
        if(!userPass)
        {
            return res.status(400).send('Невірно вказаний email або пароль');
        }

        const {passwordHash, ...userDate} = user._doc;

        const token = jwt.sign({
            _id: user._id
        },
        'secret123',
        {
            expiresIn: '15d'
        }
        )
    
    
        res.status(200).send({userDate, token});
        
    } catch (error) {

        console.log(error);
        res.status(404).send('Не вдалося авторизуватися')
    }

  


})

module.exports = {router}