const { Router } = require('express');
const courseRouter = Router();

courseRouter.post('/purchase', (req, res) => {
    res.send(`User signup endpoint`)
})

courseRouter.get('/preview', (req, res) => {
    res.json({
        message: "Course preview"
    })
})


module.exports ={
    courseRouter: courseRouter
}