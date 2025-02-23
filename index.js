require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { userRouter } = require('./routes/user')
const { adminRouter } = require('./routes/admin')
const { courseRouter } = require('./routes/courses');
const { userModel, adminModel, courseModel } = require("./db/db")
const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);

app.use("/api/v1/admin", adminRouter);

app.use("/api/v1/course", courseRouter);


async function main() {
    console.log("Connecting to db...")
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to db")
    app.listen(3000, async () => {
        console.log("Server is spinning!");
    })
}

main()