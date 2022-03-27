const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://sharp:user1234@cluster0.qt57n.mongodb.net/shop?retryWrites=true&w=majority"
    
    ).then(()=>console.log("DB Connection Success"))
    .catch((err)=>{
        console.log(err);
    }
    
    );
    

app.listen(5000, () =>{
    console.log("Backend server is running!");
})