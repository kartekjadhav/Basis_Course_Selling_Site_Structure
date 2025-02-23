const { z } = require('zod');
const { userModel } = require("../db/db")
const bcrypt = require('bcryptjs');

const signUpAuth = async (req, res, next) => {
    const bodyformat = z.object({
        firstname: z.string().min(2).max(100),
        lastname: z.string().min(2).max(100),
        password: z.string().regex(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z\d!@#$%^&*]{6,100}$/),
        email: z.string().min(2).max(100)
    });
    let parseresult = bodyformat.safeParse(req.body);
    if (!parseresult.success){
        res.status(400).json({
            message: "Invalid input",
            error: parseresult.error.errors
        })
        return;
    }
    let { firstname, lastname, email, password } = req.body;
    try {
        let user = await userModel.findOne({
            email: email
        });
        if (user){
            res.status(409).json({
                message: "User with given email already exits"
            })
            return
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
            error: error
        })
    }

}

const signInAuth = async (req, res, next) => {
    const bodyformat = z.object({
        email: z.string().min(2).max(100),
        password: z.string()
    });
    let parseresult = bodyformat.safeParse(req.body);
    if (!parseresult.success){
        res.status(400).json({
            message: "Invalid input",
            error: parseresult.error.errors
        })
        return;
    }
    let { email, password } = req.body;
    try {
        let user = await userModel.findOne({
            email: email
        });
        if (!user){
            res.status(404).json({
                message: "User not found"
            })
            return;
        }
        let comparePass = bcrypt.compare(password, user.password);
        if (!comparePass){
            res.status(401).json({
                message: "Incorrect password"
            })
            return;
        }
        req.user = user; 
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
            error: error
        })
    }

}

module.exports = {
    signUpAuth: signUpAuth,
    signInAuth: signInAuth
};