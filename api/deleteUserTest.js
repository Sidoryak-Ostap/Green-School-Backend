const {Router} = require('express');
const {UserTestModel} = require('../models/userTest.js');



const router = Router();

router.post('/delete-test', async (req,res) =>{

    try {
        
        const {test_code, subjectName} = req.body;


        const test = await UserTestModel.findOne({
            test_code: test_code,
            ["test_info.subjectName"]: subjectName
        })
    
        if(!test)
        {
            return res.status(400).send("There is no test with such params");
        }

        const deleted = await UserTestModel.deleteOne({
            test_code: test_code,
            ["test_info.subjectName"]: subjectName
        }) 


    
        res.status(200).send(deleted);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

})


module.exports = {router}
