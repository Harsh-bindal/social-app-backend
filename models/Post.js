const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  img:{
    type:String,
    default:""
  },
  likes:{
    type:Array,
    default:[]
  },
  desc:{
    type:String,
    default:""
  }
 
},
   {
    timestamps:true
   }
);

module.exports = mongoose.model("Post",postSchema);