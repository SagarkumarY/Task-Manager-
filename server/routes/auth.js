const express = require('express');
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middlewares/fetchuser")

const JWT_SECRET = "Those who do not understand true pain can never understand true peace"


//ROUTE 1: create a user using:Post "api/auth/createuser" . no login require

router.post('/createuser',  [
    // Use express-validator middleware for request validation
    body('name')
        .notEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    body('email', 'Email atleast must be 6 characters').isEmail().isLength({ min: 6 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 6 }),
], async (req, res) => {
    // if there are errores, return bad request  and the errors
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
   const success =  false;




    try {

        // check whether  the user with this  email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            // if user exitsts throw error
            return res.status(400).json({ success, error: "sorry a user with this email already exists " })
        }


        const salt = await bcrypt.genSalt(10);

        const secpass = await bcrypt.hash(req.body.password, salt)


        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass,
        })

        const data = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET)
         
        res.json({ authToken })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error');
    }

})



//ROUTE 2: Authenticate a user using:Post "api/auth/login" . no login require
router.post('/login', [
    // Use express-validator middleware for request validation
    body('email', 'Enter vaild email').isEmail(),
    body('password', 'Enter valid password').exists(),
], async (req, res) => {
    let success = false;
    // if there are errores, return bad request  and the errors
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };



    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        };


        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success =false;
            return res.status(400).json({success, error: "Please try to login with correct credentials" });
        };

        const data = {
            user: {
                id: user.id
            }
        };


        const authToken = jwt.sign(data, JWT_SECRET);
           success = true
        res.json({ success, authToken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server error');
    }

})


// Router:3 Get loggedin User Details Using :POST "/api/auth/getuser" .login required

router.post("/getuser", fetchuser, async (req,res)=>{
    try {
        
        userId = req.user.id
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
       
            console.log(error.message);
            res.status(500).send('Internal server error');
        
    }
})



module.exports = router;