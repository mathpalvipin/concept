import mongoose  from "mongoose";
const Room= mongoose.Schema({
   Name:{type:String, required:true},
   Chance:{type:String ,default:0,required:true},
   NoOfPlayers:{type:Number,default:0,required:true},
   MaxPlayer:{type:Number ,default:2,required:true},
   Players:{type:Array ,default:[] ,required:true}
})
export default mongoose.model("Room",Room)