import Room from "../model/Room.js"
export const getRoom=async ()=>{
  try{ const rooms =await Room.find({});
  rooms.reverse();
   return rooms;
}catch(e){
    throw new Error(e.message,"unable to get room");
}
}
export const createRoom= async(Data)=>{
    try{
        const {Name,user}= Data; 
        const player = [];
        player.push(user);
        const createdRoom= new Room({Name:Name,Players:player,NoOfPlayers:1})
        return await createdRoom.save();
      
    }
    catch(e){
         throw new Error(e.messge,"unable to create room");
    }
}

export const addToRoom= async(Data)=>{
    try{
        const {RoomToAdd,user }=Data;
      const players =RoomToAdd.Players;
       players.push(user);
      
     await Room.findOneAndUpdate({_id:RoomToAdd._id},{Players:players,NoOfPlayers:2});
  
    }
    catch(e){
        console.log(e);
         throw new Error(e.messge,"unable to create room");
    }
}