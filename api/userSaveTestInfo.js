const {Router} = require('express');
const jwt = require('jsonwebtoken');
const {UserTestInfoModel} = require('../models/userTestInfo.js');

const router = Router();


router.post('/saveUserTest', async (req,res) =>{


    try {


        const {subjectName, chapterName, testName, testinfo, token, test_code } = req.body;


        const decoded_token = jwt.verify(token, process.env.JWT_CODE);

        const doc = new UserTestInfoModel({
            SubjectName: subjectName,
            chapterName: chapterName,
            testName: testName,
            test_code: test_code,
            test_info: testinfo,
            user_id: decoded_token._id,
            date: new Date
        })

        const newUserTest = await doc.save();

        res.status(200).send(newUserTest);


    } catch (error) {
        console.log(error);
        res.send("Something went wrong during creating saving te test");
    }

})




module.exports = {router}