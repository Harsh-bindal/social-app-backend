const dotenv=require("dotenv");
const express=require("express");
const mongoose=require("mongoose");
const morgan=require("morgan");
const helmet=require("helmet");
const userRouter=require("./routes/user");
const authRouter=require("./routes/auth");
const postRouter=require("./routes/posts");
const conversationRouter=require("./routes/conversation");
const messageRouter =require("./routes/message");
const multer=require("multer");
const path=require("path");
const PORT=process.env.PORT || 8000
const cors=require("cors")

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,  useUnifiedTopology: true} ).then( ()=>{
    console.log("connected to mongodb");
}).catch( (err)=>console.log(err) );


const app=express();

app.use("/image",express.static(path.join(__dirname,"public/image")));

//middleware
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },

    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
});


const upload=multer({storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
    try{
        console.log("request recieved");
        console.log(req.file);
       return res.status(200).json("file uploaded succesfully");
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json("Error occurred during file upload");
    }
});


app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/posts",postRouter);
app.use("/api/conversation",conversationRouter);
app.use("/api/message",messageRouter);


app.listen(PORT, () =>{
    console.log("Connected at port",PORT);
});

