
const {Router} = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const router = Router();

const {UserModel} = require('../models/userModel.js');


router.get('/user-info', async (req,res) =>{


    try {

        const {token} = req.query;
   

        
        if(!token)
        {
            return res.status(400).send('Token is required');
        }

        const decodedToken = jwt.verify(token, 'secret123');


        const user = await UserModel.findOne({_id: decodedToken._id});

        if(!user)
        {
            return res.status(400).send('User was not found');
        }


        const {passwordHash, ...userDate} = user._doc;

        res.status(200).send(userDate);
    } catch (error) {

        console.log(error);
        res.status(404).send('Something went wrong');
        
    }

    
})


module.exports = {router}