const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    User.create({
        username,
        password
    })
    res.json({msg: "User created successfully"})
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username,
        password
    })
   if(user){
     const token = jwt.sign({username},JWT_SECRET);
     res.json({
        token
     })
   }else{
    res.status(411).json({
        msg:"SignIn failed"
    })
   }
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});

    res.status(200).json({
        courses:response
    })
    
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const username = req.username;
    const courseId = req.params.courseId;
    
        await User.updateOne({
        username
    },{
        "$push":{
            purchasedCourses : courseId
        } 
    });
    res.json({
        msg:"Purchase Complete"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username : req.username
    });
    
    const courses = await Course.findOne({
        _id : {
            "$in" : user.purchasedCourses
        }
    })
    res.json({
        courses : courses
    })
    

});

module.exports = router