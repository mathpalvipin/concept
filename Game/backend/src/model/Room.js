import mongoose from "mongoose";
const Room = mongoose.Schema({
  Name: { type: String, required: true },
  Chance: { type: Number , default: 0, required: true },
  NoOfPlayers: { type: Number, default: 0, required: true },
  MaxPlayer: { type: Number, default: 2, required: true },
  Players: {
    type: Array,
    default: [],
    required: true, 
    validate: [(val) => {console.log(val) ; return val.length < 2}, 'already 2 person in room']
  },
});

export default mongoose.model("Room", Room);
