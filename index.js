const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const UserRouter = require("./routes/User");
const cors = require('cors');
const app = express();
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
require('dotenv').config();

const PORT = process.env.PORT || 8080 ;

mongoose.connect(process.env.MONGODB_URI , {useNewUrlParser : true , useUnifiedTopology:true }, 
() => console.log("Successfully connected to the database "));

app.use(cors());
app.use('/user' , UserRouter);

//Server static assets if in production
if(process.env.NODE_ENV === "production")
{
    app.use(express.static('client/build'));
    app.get('*' , (req, res) => {
        res.sendFile(path.resolve(__dirname , 'client' , 'build' , 'index.html'));
    })
}

app.listen(PORT , ()=> console.log("Server connected successfully !"));


