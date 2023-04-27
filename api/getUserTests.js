const {Router} = require('express');
const jwt = require('jsonwebtoken');
const {UserTestModel} = require('../models/userTest.js');


const router = Router();




router.get('/user-tests', async (req,res) =>{

    try {
        const {token} = req.query;

        if(!token) {
            return res.status(400).send('Token is required');
        }
    
        const decoded_token = jwt.verify(token, process.env.JWT_CODE);
        console.log(decoded_token);
    
        const tests = await UserTestModel.find({user_id: decoded_token._id});
        
    
        res.status(200).send(tests);
    } 

    catch (error) {
        console.log(error);
        res.status(404).send(error)
    }


})



module.exports = {router}