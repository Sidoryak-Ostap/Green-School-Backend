const {Router} = require('express');
const jwt = require('jsonwebtoken');
const {UserTestInfoModel}=require('../models/userTestInfo.js');
const {TeacherTestModel}=require('../models/teactherTest.js');

const router = Router();



router.post('/test-evaluation', async (req,res)=>{



    try {

     const {testCode, userToken} = req.body;

     const token = jwt.verify(userToken, process.env.JWT_CODE);


     const teacherTest = await TeacherTestModel.findOne({test_code: testCode});
     
     if(!teacherTest) {
        console.log('По даному коду нема тічер теста');
        return;
     }

     const userTest = await UserTestInfoModel.findOne({test_code: testCode, user_id: token._id});

     if(!userTest) {
        console.log('По даному коду нема user теста');
        return;
     }

     const testUserInfo = userTest.test_info;
     const testTeacheInfo = teacherTest.test_info;
     
     let testCoeficient =12 / testTeacheInfo.length; // Кількість балів за одну правильну відповідь
    //  console.log(testCoeficient);
     let totalMark = 0;


     const MainUserAnswersArray = [];  // [['dsa','dsad'], ['dsds','dsdsa']];
     const MainTeacherAnswerArray = [] //[['dsa','dsad'], ['dsds','dsdsa']];


     testUserInfo.map(object =>{
        console.log(object);
     })


     // Витягування і підрахування правильних відповідей user в масив
     testUserInfo.map(userObject => {

        testTeacheInfo.map(techerObject =>{
            if(userObject.question == techerObject.question) {
                let userAnswers =  userObject.rightAnswers;
                let teacherAnswers = techerObject.rightAnswers;

                let rightAnswersArray = [];
                // console.log('userAnswers',userAnswers);
                userAnswers.map(userAnswer =>{
                    teacherAnswers.map(teacherAnswer =>{
                        if(userAnswer == teacherAnswer) {
                            // console.log("userAnswer", userAnswer);
                            // console.log('teacherAnswer', teacherAnswer);
                            rightAnswersArray.push(userAnswer);
                        }
                        
                    })
                })
                MainUserAnswersArray.push(rightAnswersArray);
            }
        })

     })

    //  console.log('MainUserAnswersArray',MainUserAnswersArray);


    // Витягування правильних відповідей teacher в масив

     testTeacheInfo.map(teacherObject =>{
        MainTeacherAnswerArray.push(teacherObject.rightAnswers);
     })

     console.log('MainTeacherAnswerArray',MainTeacherAnswerArray);

     // Підрахування оцінки user            

     for(let i = 0; i < MainTeacherAnswerArray.length; i++ )
     {
        const userAmountAnswer = MainUserAnswersArray[i].length;
        const teacherAmountAnswer = MainTeacherAnswerArray[i].length;

        // console.log('userAmountAnswer', userAmountAnswer);
        // console.log('teacherAmountAnswer',teacherAmountAnswer);
        const markForQuestion =  teacherAmountAnswer / userAmountAnswer; // 4 / 2  = 2, 4 / 3 =  1.33
        const markForQuestionInDecimalSystem  = testCoeficient / markForQuestion;
        totalMark += markForQuestionInDecimalSystem;
     }

     totalMark = Math.round(totalMark);

     console.log(totalMark);

     res.send({totalMark: totalMark});
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }

}) 


module.exports = {router};




