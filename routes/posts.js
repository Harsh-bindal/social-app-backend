const Post = require("../models/Post");
const router =require("express").Router();
const User= require("../models/Users");

//craete a new post
router.post("/", async (req,res) => {
    
    const newPost = new Post(req.body)
    
    try{

        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    }
    catch(err)
    {
        res.status(500).json(err);
    }
 

});


//update post
router.put("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(req.body.userId === post.userId)
        {
                  await post.updateOne({$set : req.body});
                  res.status(200).send("Post updated succesfully")
        }
        else
        {
            res.status(403).send("You can update only your post")
        }

    }
    catch(err)
    {
        res.status(500).json(err);
    }
});


//delete post

router.delete("/:id", async (req,res)=>{
    try{

        const post= await Post.findById(req.params.id);
        if(req.body.userId === post.userId)
        {
           await post.deleteOne();
           res.status(200).send("Post has beend deleted")
        }
        else
        {
            res.status(403).send("You can delete only your post")
        }
    }
    catch(err)
    {
        res.status(500).json(err)

    }
});

//get post
router.get("/:id", async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);

    }
    catch(err){
        res.status(500).json(err);
    }
});


//like post

router.put("/:id/like", async(req,res)=>{

    try{
      const post = await Post.findById(req.params.id);
      if(!post.likes.includes(req.body.userId))
      {
        await post.updateOne({$push : {likes : req.body.userId}})
        res.status(200).json("Post has been liked")
      }
      else
      {
        await post.updateOne({$pull : {likes : req.body.userId}})
        res.status(200).json("Post has been Disliked")
      }
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

router.get("/timeline/:userId", async (req,res)=>{
    try{
        const currentUser= await User.findById(req.params.userId);
        const userPosts= await Post.find({ userId: currentUser._id});
        const friendPosts= await Promise.all( currentUser.followings.map((friendId)=>{ return Post.find({userId:friendId}); }) );

        res.status(200).json(userPosts.concat(...friendPosts));
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

router.get("/profile/:username", async (req,res)=>{
    try{
        const user = await User.findOne({name:req.params.username});
        const posts = await Post.find({userId:user._id});

        res.status(200).json(posts);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});


module.exports = router;