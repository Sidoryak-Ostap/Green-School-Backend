

const {Router} = require('express');
const { validationResult } = require('express-validator');
const { UserModel } = require('../models/userModel.js');
const {CheckValidation} = require('../Validation/registerValidation.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const router = Router();

router.post('/register', CheckValidation, async (req,res) =>{

    try {

        const errors = validationResult(req);

  
        if(!errors.isEmpty())
        {
            return res.status(400).send(errors.array());
        }
    
    
        const {email, password, person, username} = req.body;
    
        if((person != 'student') && (person != 'teacher'))
        {
           return  res.send('The field person is required');
        }
    
        const user = await UserModel.findOne({email: email});
    
        if(user)
        {
            return res.status(400).send('Даний email вже використовується');
        }
    
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
       
    
      
        const doc = new UserModel({
            email: email,
            passwordHash: hash,
            username: username,
            person: person
        })
    
        const newUser = await doc.save();
    
        const {passwordHash, ...UserData} = newUser._doc;
    
       
    
        const token = jwt.sign({
            _id: newUser._id
        },
        'secret123',
        {
            expiresIn: '15d'
        }
        )
    
    
        res.status(200).send({
            token,
            UserData
        });
        
    } catch (error) {
        console.log(error);
        res.status(404).send("Не вдалося зареєструватися");
    }


})


module.exports = {router}