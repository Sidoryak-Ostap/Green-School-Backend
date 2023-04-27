

const {Router} = require('express');
const {generateApiKey } = require('generate-api-key');
const {TeacherTestModel} = require('../models/teactherTest.js');
const jwt = require('jsonwebtoken')



const router = Router();


router.post('/create-test', async (req,res) =>{
    try {


        const codeSymbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnoprqrstuvwxyz1234567890';
        const {subjectName, chapterName, testName, testinfo, token } = req.body;

        const testCode = generateApiKey({method: 'string', min: 10, max: 20, pool: `${codeSymbols}`}).toString();

        const decoded_token = jwt.verify(token, 'secret123');

        const doc = new TeacherTestModel({
            SubjectName: subjectName,
            chapterName: chapterName,
            testName: testName,
            test_code: testCode,
            test_info: testinfo,
            user_id: decoded_token._id,
            date: new Date
        })

        const newTest = await doc.save();

        res.status(200).send(newTest);


    } catch (error) {
        console.log(error);
        res.send("Something went wrong during creating saving te test");
    }
})



module.exports = {router}