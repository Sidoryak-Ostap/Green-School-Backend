

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { UserTestModel } = require('../models/userTest.js');
const {TeacherTestModel} = require('../models/teactherTest.js');
const router = Router();


router.post('/add-test', async (req, res) => {
    try {

        const { token, test_code } = req.body;

        const decoded_token = jwt.verify(token, process.env.JWT_CODE);

        const teacherTest = await TeacherTestModel.findOne({test_code: test_code});

        if(!teacherTest) {

            return res.status(200).send('There is not test with such code')
        }

        console.log('teacherTest', teacherTest);
        const { SubjectName ,chapterName, testName} = teacherTest;

        const test = new UserTestModel({
            user_id: decoded_token._id,
            test_code,
            mark: 0,
            completed: 0,
            test_info: {subjectName: SubjectName, theme: chapterName, testName},
            date: new Date()
        })

        const doc = await test.save();

        console.log(doc);

        res.status(200).send(doc);

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

})





module.exports = { router }