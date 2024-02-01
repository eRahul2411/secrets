const express = require('express');
const bodyParser = require ('body-parser');
const ejs = require("ejs");
const encrypt = require('mongoose-encryption');
var app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/secrets");
const trySchema = new mongoose.Schema({
    email: String,
    password: String
})
const secret = "thisislittlesecret.";
trySchema.plugin(encrypt,{secret:secret,encryptedFields:["password"]});
const item = mongoose.model("second",trySchema)
app.get("/",function(req,res){
    res.render("home");
});
app.post("/register", async function(req,res){
    const newUser = new item({
        email: req.body.username,
        password: req.body.password
    });
    try {
        await newUser.save();
        res.render("secrets");
    } catch (err) {
        console.log(err);
    }
});
/*app.post("/login", async function(req,res){
    const username =req.body.username;
    const password = req.body.password;
    item.findOne({email:username},functions(err,foundUser){
        if(err){
            console.log(err);
        }
        else{
            if(foundUser){
                if(foundUser.password === password){
                    res.render("secrets");
                }
            }
        }
    });
});*/
app.post("/login", async function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    try {
        const foundUser = await item.findOne({email: username});
        if (foundUser) {
            if (foundUser.password === password) {
                res.render("secrets");
            } else {
                // Handle incorrect password here
            }
        } else {
            // Handle user not found here
        }
    } catch (err) {
        console.log(err);
    }
});

/*app.post("/login", async function(req,res){
    const username =req.body.username;
    const password = req.body.password;
    item.findOne({email:username},functions(err,foundUser){
        if(err){
            console.log(err);
        }
        else{
            if(foundUser){
                if(foundUser.password === password){
                    res.render("secrets");
                }
            }
        }
    });
});*/
app.get("/login",function(req,res){
    res.render("login");
});
app.get("/register",function(req,res){
    res.render("register");
});

app.listen(8000,function(){
    console.log("server started");
});
