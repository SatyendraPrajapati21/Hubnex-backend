const Users= require('../models/users');
const bcrypt = require("bcrypt");
const validatePhoneNumber = require('validate-phone-number-node-js');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.signup= async (req, res, next) => {
      
        try {
            const errors= validationResult(req);
            if (! errors.isEmpty()) {
                const error= new Error("Validation failed.");
                error.statusCode= 422;
                error.data= errors.array();
                throw error;
            }

            const { fullName, email, phoneNumber, password} = req.body;

          const result = await validatePhoneNumber.validate(phoneNumber);
          if (! result) {
            const error= new Error("Invalid Phone number.");
             throw error
          }
          const passwordHash = await bcrypt.hash(password, 10);
          const userData = new Users({
            fullName,
            email,
            phoneNumber,
            password: passwordHash,
          });
          const saveUserData = await userData.save();
          res.status(201).json(saveUserData);
        } catch (error) {
          if (! error.statusCode) {
            error.statusCode= 500;
          }
          next(error);
        }
    };

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const userData = await Users.findOne({ email });
      if (! userData) {
        const error = new Error(" A user with this id could not be found.");
        error.statusCode=401;
        throw error;
      }
      else {
        const passwordCompare = await bcrypt.compare(password, userData.password);
        if (! passwordCompare) {
          const error= new Error('Incorrect E-mail address or Password.');
          error.statusCode=401;
          throw error;
        } 

        const token= jwt.sign({
            
            email: userData.email,
            userId: userData._id.toString()
        },'HuBneX@4536#WdFt78',
        {expiresIn:'24h'});

        res.status(200).json({token: token, userId: userData.userId, expiresIn: 24*60*60 });
      } 
    } catch (error) {
       if (! error.statusCode) {
          error.statusCode= 500;
       }

       next(error);
    }
  };