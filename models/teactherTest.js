
const {model, Schema, Types} = require('mongoose');


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

const TeacherTestModel = new model('tests', schema, 'tests');

module.exports = {TeacherTestModel}