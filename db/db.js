const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: String,
    lastname: String,
    password: String
});

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstname: String,
    lastname: String,
    password: String
});

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    creatorId: ObjectId,
    imageurl: String
});

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
});

const userModel = mongoose.model("users", userSchema);
const adminModel = mongoose.model("admins", adminSchema);
const courseModel = mongoose.model("courses", courseSchema);
const purchaseModel = mongoose.model("purchases", purchaseSchema);


module.exports = {
    userModel: userModel,
    adminModel: adminModel,
    courseModel: courseModel,
    purchaseModel: purchaseModel
}