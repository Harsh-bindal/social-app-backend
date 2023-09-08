const router=require("express").Router();
const User=require("../models/Users");
const bcrypt=require("bcrypt");

router.post("/register",async (req,res)=>{
  
    try{
        const salt = await bcrypt.genSalt(10);  //10 data processing speed
        const hashedPassword=await bcrypt.hash(req.body.password,salt);

        const newUser =  new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        });

        const user=await newUser.save();
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
});

router.post("/login",async (req,res)=>{
    try{


        const user= await User.findOne({email:req.body.email});
        !user && res.status(400).send("user not found");

        const validPassword= await bcrypt.compare(req.body.password,user.password);
        !validPassword && res.status(400).json("wrong password");

        res.status(200).send(user);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

module.exports = router;