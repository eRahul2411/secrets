const express = require('express');
const bodyParser = require ('body-parser');
const ejs = require("ejs");



var app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.get("/",function(req,res){
    res.render("home");
});
app.get("/login",function(req,res){
    res.render("login");
});
app.get("/register",function(req,res){
    res.render("register");
});



app.listen(5000,function(){
    console.log("server started");
});
