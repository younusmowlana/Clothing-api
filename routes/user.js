const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//Update
router.put("/:id" ,verifyTokenAndAuthorization, async (req,res)=>{
    if(req.body.password){
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password, 
        process.env.PASS_SEC
        ).toString();
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
        {
            $set:req.body,
        },
        {new:true}
        
        );
        res.status(200).send(updatedUser);
    }catch(err){
       return res.status(500).json(err);
    }
});


//Delete
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

//Get user by id (read)
router.get("/find/:id",verifyTokenAndAdmin,async (req,res)=>{ //only admin get any user by id
    try{
        const user = await User.findById(req.params.id);

        const { password, ...others } = user._doc;  
        res.status(200).json(others);
    }catch(err){
        return res.status(500).json(err);
    }
});

 //Get all users(read)
router.get("/",verifyTokenAndAdmin,async (req,res)=>{ //only admin get any user by id
  try{
      const users = await User.find();
      res.status(200).json(users);
  }catch(err){
      return res.status(500).json(err);
  }
});



module.exports = router