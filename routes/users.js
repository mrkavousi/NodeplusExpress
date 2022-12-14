var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const Models = require('./../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { token } = require('morgan');
const User = Model.User;
dotenv.config();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async(req, res, next) {
  const salt = await bcrypt.genSalt(10);
  var usr = {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
    password : await bcrypt.hash(req.body.password, salt)
  };
  created_user = await User.creat(usr);
  res.status(201).json(created_user);
});

router.post('/login' ,async(req,res,next)=> {
  const user = await User.findOne({ where : {email : req.body.email}});
  if(user){
    const password_valid = await bcrypt.compare(req.body.password,user.password);
    if(password_valid){
      token = jwt.sign({"id" : usedr.id, "email" : user.first_name},process.env.SECRET);
      res.status(200).json({ token : token});
    }
    else {
      res.status(400 ).json({error : "Password Incorrect"});
    } }
  else {
      res.status(404).json({ error : "User does not exist"});
    }
})

router.get('/me',
async(req,res,next)=> {
  try {
    let token = req.headers['authorization'].split(" ")[1];
    let decode = jwt.verify(token,process.env.SECRET);
    req.user = decode;
    next();
  } catch(err)
{
  res.status(401).json({"msg":"Couldnt Athenticate"});
}
},
async(req,res,next)=>{
  let user = await User.findOne({where:{id : req.user.id},attributes:{exclude:["password"]}});
  if(user === null){
    res.status(404).json({'msg':"User not found"});
  }
  res.status(200).json(user);
});



module.exports = router;
