const { Router } = require('express');
const adminRouter = Router();
const { adminsignInAuth, adminsignUpAuth, adminTokenAuth } = require('../middlewares/adminauth')
const jwt = require('jsonwebtoken')
JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET
const bcrypt = require('bcryptjs');
const { adminModel, courseModel } = require('../db/db');
const { z } = require("zod");

adminRouter.post('/signup', adminsignUpAuth, async (req, res) => {
    let { firstname, lastname, email, password } = req.body;
    let hashedpass = await bcrypt.hash(password, 10);
        await adminModel.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedpass
        });
        res.status(201).json({
            message: "Signup Successfull"
        })
})

adminRouter.post('/signin', adminsignInAuth, (req, res) => {
    let token = jwt.sign({
            userId: req.admin._id
        }, JWT_ADMIN_SECRET);
        res.json({
            message: "Signin Successfull",
            token: token
        })
})

adminRouter.post('/courses', adminTokenAuth, async (req, res) => {
    let validbody = z.object({
        title: z.string().max(200),
        description: z.string().max(2000),
        price: z.number().max(1000),
        imageurl: z.string().max(1000)
    });
    let bodyCheck = validbody.safeParse(req.body);
    if (!bodyCheck.success){
        res.status(400).json({
            message: "Invalid course details",
            error: bodyCheck.error.errors
        });
        return;
    }
    let { title, description, price, imageurl } = req.body;
    let tokenData = jwt.decode(req.headers.authorization);
    try {
        let course = await courseModel.findOne({
            title, creatorId: tokenData.userId
        })
        if (course) {
            res.status(409).json({
                message: "Course with this title already exits",
            });
            return;    
        }
        await courseModel.create({
            title, description, price, imageurl,
            creatorId: tokenData.userId
        });
        res.status(201).json({
            message: "Course has been added",
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal SErver error",
            error: error
        })
    }
})


adminRouter.put('/courses', adminTokenAuth, async (req, res) => {
    let userId = bcrypt.decode()
})

module.exports = {
    adminRouter: adminRouter
}