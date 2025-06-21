const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://barmanbishal1234:TritigdoOKNhR3GQ@cluster0.rp54j.mongodb.net/course_sellingApp2?retryWrites=true&w=majority&appName=Cluster0');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username : String,
    password : String,
});

const UserSchema = new mongoose.Schema({
    // Schema definition here  
    username : String,
    password : String,
    purchasedCourses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    title : String,
    description : String,
    ImageLink : String,
    price : Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}