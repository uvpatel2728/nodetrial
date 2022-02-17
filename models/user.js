const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 55
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 1024
    }
})

const User = mongoose.model('User',userSchema);

function validateUser(user) {
    const schema={
        name: Joi.string().min(4).max(55).required(),
        email: Joi.string().min(4).max(255).required().email(),
        password: Joi.string().min(4).max(1024).required()

    }
    return Joi.validate(user,schema)
}

exports.User = User;
exports.validateUser = validateUser;