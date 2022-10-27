const router = require("express").Router();
const authControllers = require('../controllers/auth');
const bcrypt = require("bcrypt");
const {body} = require('express-validator');
const Users = require("../models/users");

// *********************************************************************************************//

// user Users

router.put("/signup",[
                    body('email')
                    .isEmail()
                    .withMessage("Please enter a Valid email address.")
                    .custom((value,{req})=>{
                     return  Users.findOne({email:value})
                            .then(userDoc=>{
                              if (userDoc) {
                                return Promise.reject("E-mail address already exists.");
                              }
                            });    
                    })
                    .normalizeEmail(),
                    body('password')
                    .trim()
                    .isLength({min:5})
                    .withMessage("Password length must be greater than 5.")
],authControllers.signup);

router.post("/login",authControllers.login );

module.exports = router;
