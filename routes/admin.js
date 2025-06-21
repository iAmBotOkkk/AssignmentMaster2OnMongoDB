const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User, Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config")


// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    // check if a user with this username already exists
    await Admin.create({
        username: username,
        password: password
    })

    res.json({
        message: 'Admin created successfully'
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const admin = await Admin.findOne({
        username,
        password
    })
    if (admin) {
        const token = jwt.sign({username}, JWT_SECRET);

        res.json({
            token
        })
    }else{
        res.status(411).json({
            message: "Incorrect email and pass"
        })
    }
});


router.post('/courses', adminMiddleware, async (req, res) => {

    const title = req.body.title;
    const description =  req.body.description;
    const price = req.body.price;
    const ImageLink = req.body.ImageLink; 
    
     const newCourse = await Course.create({
        title,
        description,
        price,
        ImageLink
    })
    res.json({msg: "Course created successfully", Course_Id : newCourse._id })

});
router.get('/courses', adminMiddleware, (req, res) => {
    
    Course.find({})
    .then(function(response){
        res.json({
            courses:response
        })
    })
});

module.exports = router;
