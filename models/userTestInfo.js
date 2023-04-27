const {model ,Schema} = require('mongoose');


const schema = new Schema({

    SubjectName: {
        type: String
    },

    chapterName:{
        type: String
    },

    testName:{
        type: String
    },

    test_code:{
        type: String
    },

    user_id: {
        type: String
    },

    test_info: [
        {question: String, answers: [String], rightAnswers: [String]}
    ],

    date: {type: Date}

})

const UserTestInfoModel = new model('pupils_test_info', schema, 'pupils_test_info');

module.exports = {UserTestInfoModel}