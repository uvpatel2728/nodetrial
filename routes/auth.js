const _ = require('lodash');
const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const router = express.Router();
const { User } = require('../models/user');

router.get('/', async (req,res) => {
    const users = await User.find().sort('name')
    res.send(users);
})

router.post('/', async (req,res) => {
    const { error } = validateAuth(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid Email or Password')

    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.status(400).send('Invalid Email or Password')

    const token =  jwt.sign({ _id: user._id },config.get('jwtprivateKey'))

    res.send(token)
});

function validateAuth(user) {
    const schema={
        email: Joi.string().min(4).max(255).required().email(),
        password: Joi.string().min(4).max(1024).required()

    }
    return Joi.validate(user,schema)
}

module.exports = router;