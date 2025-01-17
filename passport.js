const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require("./models/User");
require('dotenv').config();


const cookieExtractor = req => {
    let token = null ; 
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

//authorization - protected routes
passport.use(new JwtStrategy({
    jwtFromRequest:cookieExtractor,
    secretOrKey:process.env.ACCESS_TOKEN_SECRET
},(payload , done )=>{
    User.findById({_id : payload.sub } , (err , user) => {
        if(err) return done(err , false); // Something wrong with the DB
        if(user) return done(null , user);// User does exist
        else return(null , false);
    })
}));

//authentication - log in
passport.use(new LocalStrategy((username , password , done) => {
    User.findOne({username} , (err , user)=> {
        if(err) return done(err); // Something wrong with the DB
        if(!user) return done(null , false); // User does not exist
        user.comparePassword(password,done); // Check if password is correct
    })
}))