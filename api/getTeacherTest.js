

const {Router} = require('express')

const {TeacherTestModel} = require('../models/teactherTest.js');
const router = Router();



router.get('/find-tests', async (req,res)=>{


    try {

    const {testCode} = req.query;

    const test = await TeacherTestModel.findOne({test_code: testCode});

    if(!test)
    {
        return res.status(200).send("Тест не знайдено");
    }


    res.status(200).send(test);

    } catch (error) {
        console.log(error);
        res.status(400).send("Something went wrong during try to find tests");
    }
})

module.exports = {router};