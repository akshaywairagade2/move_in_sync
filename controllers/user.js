// const { model } = require('mongoose')
// const bcrypt = require('bcrypt')
const User = require('../models/User')
const Jwt = require('jsonwebtoken')
const jwtKey = 'floor';
const bcrypt = require('bcrypt')
// const nodemailer = require("nodemailer");
// const axios = require("axios")
// const env = require('dotenv');

// env.config();


exports.create_user = async (req, res) => {
     // console.log(req.body)
     try{
     let user = new User(req.body);
     const hashPassword = await bcrypt.hash(req.body.password, 10);
     user.password = hashPassword
     let result = await user.save();
     result = result.toObject();
  
     Jwt.sign({result}, jwtKey, {expiresIn:"2h"},(err,token)=>{
         if(err){
             res.send("Something went wrong")  
         }
         res.send({result,auth:token})
     })
    }
    catch(error){
      res.send(message="Something went wrong")
    }
};

exports.login_user = async(req, resp) => {
  email = req.body.email;
    if (req.body.password && req.body.email) {
        let user = await User.findOne({email});
        if (user) {
          const isValid = await bcrypt.compare(req.body.password, user.password)
          if (isValid){
            Jwt.sign({user}, jwtKey, {expiresIn:"2h"},(err,token)=>{
              if(err){
                  resp.send("Something went wrong")  
              }
              resp.send({user,auth:token})
          })
          }  
        } else {
            resp.send({ result: "No User found" })
        }
    } else {
        resp.send({ result: "No User found" })
    }
}


exports.get_users = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  
exports.get_user_by_id = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  
exports.delete_user_by_id = async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (deletedUser) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }