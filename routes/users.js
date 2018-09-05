const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register Route
router.post('/register', (req, res, next) => {

  // Only allow to create 'user'
  if(req.body.role !== 'user'){

    res.json({success: false, msg:'Failed to register user'})

  } else {

    let newUser = new User({

      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role

    });

    User.addUser(newUser, (err, user) => {
      if(err){
        res.json({success: false, msg:'Failed to register user'})
      } else {
        res.json({success: true, msg:'User registered'})
      }
    })
  }
});

// Authenticate Route
router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const msgIncorrectLogin = "Email or Password is Incorrect";

  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: msgIncorrectLogin});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;

      if(isMatch){
        user = {
          _id: user._id,
          name: user.name,
          email: user.email
        }

        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week in seconds
        });

        res.json({
          success: true,
          token: 'bearer '+token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email
          },
          msg: 'Welcome '+user.name
        })

      } else {

        return res.json({success: false, msg: msgIncorrectLogin});

      }
    });
  });
});

// Profile Route
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
