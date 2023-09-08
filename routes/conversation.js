const router=require("express").Router();
const Conversation =require("../models/Conversations");

//create conversation
router.post("/",async(req,res)=>{

const newConversations=new Conversation({
    members:[req.body.senderId,req.body.recieverId]
});

    try{
    const savedConversations= await newConversations.save();
    res.status(200).json(savedConversations);
    }
    catch(err)
    {
        res.status(500).json(err);
    }

});



//get conversation

router.get("/:userId",async(req,res)=>{

    try{

        const conversation=await Conversation.find({members:{$in:[req.params.userId]}});
        res.status(200).json(conversation);
    }catch(err)
    {
        res.status(500).json(err);
    }


})

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports=router;