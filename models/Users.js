const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true,
   },
   email:{
     type:String,
     required:true,
     unique:true
   },
   password:{
    type:String,
    required:true,
   },
   followings:{
       type:Array,
       default:[],
   },
   followers:{
    type:Array,
    default:[],
   },
   profilePicture:{
    type:String,
    default:""
    
   },
   coverPicture:{
      type:String,
      default:""
      
   },
   isAdmin:{
      type:Boolean,
      default:false
   },
   Desc:{
      type:String,
      max:50,
   },
   city:{
      type:String,
      max:30
   },
   from:{
      type:String,
      max:30
   },
   relationship:
   {
      type:Boolean,
      default:true
   }
},
   {
    timestamps:true
   }
);

module.exports = mongoose.model("User",userSchema);