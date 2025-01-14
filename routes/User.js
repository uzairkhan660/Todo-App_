const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require("../passport");
const User = require("../models/User");
const Todo = require("../models/Todo");
require('dotenv').config(); 

const signToken = userId => {
    return jwt.sign({
        iss : "JustArt" , 
        sub : userId ,
    } , process.env.ACCESS_TOKEN_SECRET , {expiresIn : "1h" });
}

router.post('/register' , (req, res)=> {
    const { username , password , role } = req.body ;
    User.findOne({username} , (err, user) => {
        if(err) return res.status(500).json({message : {msgBody:"Error has occured" , msgError : true}});
        if(user) return res.status(400).json({message : {msgBody:"Username is already taken" , msgError : true}});
        const newUser = new User({username , password, role});
        newUser.save(err => {
            if(err) return res.status(500).json({message : {msgBody:"Error has occured" , msgError : true}});
            else return res.status(201).json({message : {msgBody:"Account successfully created !" , msgError : false}});
        })
    })
})

router.post('/login' ,passport.authenticate('local' , {session : false}) , (req, res) => {
    if(req.isAuthenticated()){
        const {_id , username , role} = req.user ;
        const token = signToken(_id);
        res.cookie('access_token' , token , {httpOnly : true , sameSite : true});
        //httpOnly doesn't allow the JavaScript code to access your cookie hence saves from Cross Site Scripting attacks
        //sameSite doesn't allow a third-part to access a user's session hence saves from Cross Site Request Forgery attacks .
        res.status(200).json({isAuthenticated : true , user : {username , role}});
    }
});

router.get('/logout' ,passport.authenticate('jwt' , {session : false}) , (req, res) => {
    res.clearCookie('access_token');
    res.json({ user : {username : "" , role : ""} , success : true });
});

router.get('/todos' , passport.authenticate('jwt' , {session : false}) , (req, res) => {
    User.findById({_id : req.user._id}).populate('todos').exec((err , document) => {
        if(err) return res.status(500).json({message : {msgBody:"Error has occured" , msgError : true}});
        res.status(200).json({ todos : document.todos , authenticated : true });
    })
});

router.post('/todo' ,passport.authenticate('jwt' , {session : false}) , (req, res) => {
    const todo = new Todo(req.body);
    todo.save(err =>{
        if(err) return res.status(500).json({message : {msgBody:"Error has occured" , msgError : true}});
        req.user.todos.push(todo);
        req.user.save(err => {
            if(err) return res.status(500).json({message : {msgBody:"Error has occured" , msgError : true}});
            res.status(200).json({ message : {msgBody : "Successfully created a todo " , msgError : false}});
        })
    })
});

router.delete('/removeTodo' , passport.authenticate('jwt' , {session : false}) , (req , res) => {
    Todo.deleteOne({_id : req.body._id } , (err , result) => {
        if(err) return res.status(500).json({message : {msgBody:"Error has occured" , msgError : true}});
        return res.status(200).json({ message : {msgBody : "Successfully deleted a todo " , msgError : false}});
    });
});

//Only for admins
router.get('/admin' , passport.authenticate('jwt' , {session : false}) , (req, res) => {
    if(req.user.role === 'admin') res.status(200).json({message : {msgBody : "You are an admin" , msgError : false}}); 
    else res.status(403).json({message : {msgBody : "You are not authorized to view this resource " , msgError : true }});
});

//Makes sure the state is saved even if you close the browser so that uou don't re-login everytime you close the browser
router.get('/authenticated' , passport.authenticate('jwt' , {session : false}) , (req , res) => {
     const { username , role } = req.user ;
     res.status(200).json({isAuthenticated : true , user : {username , role}});
})

module.exports = router ;