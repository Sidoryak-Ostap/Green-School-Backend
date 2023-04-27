


const { Router } = require('express');
const { TeacherTestModel } = require('../models/teactherTest.js');
const jwt = require('jsonwebtoken');

const router = Router();



router.get('/teacher-tests', async (req, res) => {

    try {

        const { token } = req.query;

        const decoded_token = jwt.verify(token, 'secret123');

        const tests = await TeacherTestModel.find({ user_id: decoded_token._id });

        if (!tests) {
            return res.status(200).send("There are not tests");
        }

        res.status(200).send(tests);


    } catch (error) {
        console.log(error);
        res.status(400).send("Something went wrong duting to try to find tests");
    }


})


module.exports = { router };