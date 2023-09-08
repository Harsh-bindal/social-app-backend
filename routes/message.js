const router=require("express").Router();
const Message=require("../models/Messages");

//post message
router.post("/",async(req,res)=>{
    const newMessage= new Message(req.body);

    try{
        const savedMessage=await newMessage.save();
        res.status(200).json(savedMessage);

    }catch(err)
    {
        res.status(500).json(err);
    }
});


//get message
router.get("/:conversationId",async(req,res)=>{

    try{
        const getMessages= await Message.find({conversationId :req.params.conversationId});
        res.status(200).json(getMessages);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
})



module.exports=router;