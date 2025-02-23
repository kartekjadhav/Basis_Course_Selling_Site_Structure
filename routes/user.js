const { Router } = require('express');
const userRouter = Router();
const { signUpAuth, signInAuth } = require('../middlewares/userauth')
const jwt = require('jsonwebtoken')
JWT_USER_SECRET = process.env.JWT_USER_SECRET;
const bcrypt = require('bcryptjs');
const { userModel } = require('../db/db');

userRouter.post('/signup', signUpAuth, async (req, res) => {
    let { firstname, lastname, email, password } = req.body;
    let hashedpass = await bcrypt.hash(password, 10);
        await userModel.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedpass
        });
        res.status(201).json({
            message: "Signup Successfull"
        })
})

userRouter.post('/signin', signInAuth, (req, res) => {
    let token = jwt.sign({
        userId: req.user._id
    }, JWT_USER_SECRET);
    res.json({
        message: "Signin Successfull",
        token: token
    })
})

userRouter.post('/user/purchases', (req, res) => {
    res.send("Purchased courses endpoint")
})

module.exports ={
    userRouter: userRouter
}