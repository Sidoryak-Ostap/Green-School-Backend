const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const ConnectMongo = require('./connectMongo/connect.js')
const Register = require('./api/register.js');
const Login = require('./api/login.js');
const UserInfo = require('./api/userinfo.js');
const TeacherTest = require('./api/createTest.js');
const GetUserTest = require('./api/getUserTests.js');
const GetTeacherTest = require('./api/getTeacherTest.js');
const GetTeacherTests = require('./api/getTeacherTests.js');
const GetUserTests = require('./api/getUserTests.js');
const DeletUserTest = require('./api/deleteUserTest.js');
const AddUserTest = require('./api/addUserTest.js');
const SaveUserTest = require('./api/saveUserTest.js');
const SaveUserTestInfo = require('./api/userSaveTestInfo.js');
const TestEvaluation  = require('./api/testEvaluation.js');




const start = async () => {

    try {


        app.use(bodyParser.json());
        app.use(cors());

        await ConnectMongo.conectBD(process.env.MONGO_URL); // Mongo db connection

        app.use(Register.router)
        app.use(Login.router);
        app.use(UserInfo.router);
        app.use(TeacherTest.router);
        app.use(GetUserTest.router);
        app.use(GetTeacherTest.router);
        app.use(GetTeacherTests.router);
        app.use(GetUserTests.router);
        app.use(DeletUserTest.router);
        app.use(AddUserTest.router);
        app.use(SaveUserTest.router);
        app.use(SaveUserTestInfo.router);
        app.use(TestEvaluation.router);


        app.listen(process.env.PORT, () => {
            console.log("Server started on port ", process.env.PORT);
        })

    }
    catch (error) {
        console.log(error);
    }

}




start();