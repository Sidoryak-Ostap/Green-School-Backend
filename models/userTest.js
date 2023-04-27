
const {model, Schema, Types} = require('mongoose');


const schema = new Schema({
    user_id: Types.ObjectId,
    test_code: String,
    grade: Number,
    completed: Number,
    test_info: {subjectName: String, theme: String, testName: String},
    date: Date

})

const UserTestModel = new model('user_tests', schema, 'user_tests');

module.exports = {UserTestModel}