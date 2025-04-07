

// I follow the link for JWT authentication for node:"https://www.youtube.com/watch?v=S20PCL9e_ks&t=180s"

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const secretKey = "secretkey";
const cors = require("cors")

app.get("/", (req, res)=> {
    res.json({
        message: "JWT simple api"
    })
})

app.post("/login", (req, res)=>{
    const user={
        id: 1,
        username:"Shiva",
        email:"shiva@gmail.com"
    }
    jwt.sign({user}, secretKey, {expiresIn: '300s'}, (err, token)=>{
        res.json({
            token
        })
    })
})

app.post("/profile", verifyToken, (req, res)=>{
    jwt.verify(req.token, secretKey, (err, authData)=>{
        if(err){
            res.send({result: "Invalid token"})
        } else{
            res.json({
                message: "Profile accessed", 
                authData
            })
        }
    })
})

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader != 'undefined'){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();

    }else{
        res.send({
            result: 'Token is not valid'
        })
    }
}

app.listen(5000, ()=>{
    console.log("This JWT node running on 5000 port");
})