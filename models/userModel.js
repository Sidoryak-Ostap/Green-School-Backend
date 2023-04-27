


const {model, Schema} = require('mongoose');

const schema = new Schema({
    username: {
        required: true,
        type: String, 
    },
    
    email: {
        required: true,
        type: String,
        unique: true
    },

    passwordHash: {
        required: true,
        type: String
    },

    person: {
        required: true,
        type: String
    }
})

const UserModel = new model('users', schema, 'users');

module.exports = {UserModel}