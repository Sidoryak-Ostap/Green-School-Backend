const {Router} = require('express');

const { UserTestModel } = require('../models/userTest.js');

const router = Router();


router.patch('/save-test', async (req,res) =>{
try {
    const {grade, completed, test_code} = req.body;


    const test = await UserTestModel.findOne({test_code});
    if(!test) {
        return res.status(400).send('Ivalid test code');
    }

    const testUpdated = await UserTestModel.updateOne({
        test_code
    },
    {$set : {grade, completed}}
    )

    res.status(200).send(testUpdated)

} catch (error) {
    console.log(error);
    res.status(400).send(error);
}

})

module.exports = {router} 