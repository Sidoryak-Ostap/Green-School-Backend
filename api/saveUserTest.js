const {Router} = require('express');
// require('dotenv').config();
const jwt = require('jsonwebtoken');
const { UserTestModel } = require('../models/userTest.js');

const router = Router();


router.patch('/save-test', async (req,res) =>{
try {
    const {mark, completed, test_code , token} = req.body;

    const decodedToken = jwt.verify(token, process.env.JWT_CODE);    
    const test = await UserTestModel.findOne({test_code});

    if(!test) {
        return res.status(400).send('Ivalid test code');
    }

    const testUpdated = await UserTestModel.updateOne({
        test_code, user_id: decodedToken._id
    },
    {$set : {mark, completed}}
    )


    res.status(200).send(testUpdated)

} catch (error) {
    console.log(error);
    res.status(400).send(error);
}

})

module.exports = {router} 