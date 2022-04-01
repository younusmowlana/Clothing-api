const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//Register
router.post("/register", async (req,res)=>{
    const newUser=new User ({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC)
        .toString(),
    });

    try{

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

    }catch(err){
    res.status(500).json(err);
}
});

//Login
router.post("/login", async (req,res) => {
    try{
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.status(401).json("Wrong username! ");

    }
                 
    const hashedPassword = CryptoJS.AES.decrypt(
        user.password, 
        process.env.PASS_SEC
        );
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
          
       
if (OriginalPassword !==req.body.password) {
   return  res.status(401).json("Wrong password! "); 
}
        const { password, ...others } = user._doc;

        res.status(200).json(user);
    }catch(err){
      return  res.status(500).json(err);
    }

});


module.exports = router