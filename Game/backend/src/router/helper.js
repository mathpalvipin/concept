import Room from "../model/Room.js";
export const getRoom = async () => {
  try {
    const rooms = await Room.find({});
    rooms.reverse();
    return rooms;
  } catch (e) {
    throw new Error(e.message, "unable to get room");
  }
};
export const createRoom = async (Data) => {
  try {
    const { Name, player } = Data;
    const players = [];
    console.log(player);
    players.push({ ...player, i: 0, j: -1 });
    const createdRoom = new Room({
      Name: Name,
      Players: players,
      NoOfPlayers: 1,
    });
    return await createdRoom.save();
  } catch (e) {
    console.log(e);
    throw new Error(e.messge, "unable to create room");
  }
};

export const addToRoom = async (Data) => {
  try {
    const { InRoom, player } = Data;
    const players = InRoom.Players;

    players.push({ ...player, i: 0, j: -1 });
    if (players.length > 2) throw new Error("Room is full");

    const id = players.length;
   return await Room.findOneAndUpdate(
      { _id: InRoom._id },
      { Players: players, NoOfPlayers: 2 }
    );
  } catch (e) {
    console.log(e);
    throw new Error(e.messge, "unable to create room");
  }
};
export const getRoomDetails = async (RoomID) => {
  try {
    const roomDetails = await Room.findOne({ _id: RoomID });
    return roomDetails;
  } catch (e) {
    console.log(e);
    throw new Error(e.messge, "unable to get room details  room");
  }
};
export const updateRoom=(async(updatedRoom)=>{
await Room.findOneAndUpdate({_id:updatedRoom._id},{...updatedRoom})
})
const SandL = [
  {
    from: { i: 0, j: 3 },
    to: { i: 2, j: 4 },
  },
  {
    from: { i: 2, j: 0 },
    to: { i: 3, j: 8 },
  },
  {
    from: { i: 2, j: 8 },
    to: { i: 7, j: 3 },
  },
   {
    from: { i: 2, j: 9 },
    to: { i: 0, j: 6 },
  }, {
    from: { i: 4, j: 2 },
    to: { i: 7, j: 5 },
  }, {
    from: { i: 4, j: 6 },
    to: { i: 1, j: 4 },
  }, {
    from: { i: 5, j: 5 },
    to: { i: 1, j: 8 },
  }, {
    from: { i:6, j: 2 },
    to: { i:7, j: 9 },
  }, {
    from: { i:6, j: 9 },
    to: { i: 8, j: 8 },
  }, {
    from: { i: 7, j: 2 },
    to: { i: 5, j: 0 },
  },
  {
    from: { i: 8, j: 1 },
    to: { i: 4, j: 1 },
  },
  {
    from: { i: 9, j: 1 },
    to: { i: 7, j: 4 },
  },
  {
    from: { i: 9, j: 7 },
    to: { i: 5, j: 4 },
  },
];
export const checkSandL = (Data) => {
    try{ 
        const {i ,j }=Data;
        var jump=null;
        SandL.map((sandl)=>{
    if(sandl.from.i===i && sandl.from.j===j){
        jump={i:sandl.to.i, j:sandl.to.j};
    }
})
 return jump;
    }catch(e){
        console.log(e);
    }

};
