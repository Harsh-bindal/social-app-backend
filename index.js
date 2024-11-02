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
const PORT= 8000
const cors=require("cors")
const http=require("http")
const socketIo = require("socket.io");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,  useUnifiedTopology: true} ).then( ()=>{
    console.log("connected to mongodb");
}).catch( (err)=>console.log(err) );


const app=express();
///////////
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});
////////////////


app.use("/image",express.static(path.join(__dirname,"public/image")));

//middleware
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use('/public', express.static(path.join(__dirname, 'public')));

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/image");
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


// Socket.IO setup
io.on("connection", (socket) => {
  console.log("New client connected");

  // Listen for chat messages
  socket.on("chatMessage", (msg) => {
    io.emit("message", msg); // Broadcast the message to all clients
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

////////////////////////

app.listen(PORT, () =>{
    console.log("Connected at port",PORT);
});

