const mongoose=require("mongoose");

const messageSchema =new mongoose.Schema(
    {
        conversationId:{
            type:String
        },
        text:
        {
            type:String
        },
        sender:
        {
            type:String
        }



    },
    {
        timestamps:true,

    }
);


module.exports = mongoose.model("Messages",messageSchema);
