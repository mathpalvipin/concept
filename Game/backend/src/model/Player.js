import mongoose from "mongoose";
const Player = mongoose.Schema({
    Name:{type:String ,required: true ,unique: true,
        uniqueCaseInsensitive: true},
    Color:{type:String },
    Room:{type:String}
});

export default mongoose.model("Player",Player)