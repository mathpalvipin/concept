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
    const { Name, user } = Data;
    const player = [];
    player.push({ ...user, i: 0, j: -1 });
    const createdRoom = new Room({
      Name: Name,
      Players: player,
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
    const { RoomToAdd, user } = Data;
    const players = RoomToAdd.Players;

    players.push({ ...user, i: 0, j: -1 });
    if (players.length > 2) return;

    const id = players.length;
    await Room.findOneAndUpdate(
      { _id: RoomToAdd._id },
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

const SandL = [
  {
    from: { i: 1, j: 9 },
    to: { i: 2, j: 2 },
  },
  {
    from: { i: 1, j: 1 },
    to: { i: 2, j: 2 },
  }, {
    from: { i: 1, j: 2 },
    to: { i: 2, j: 2 },
  }, {
    from: { i: 1, j: 3 },
    to: { i: 2, j: 2 },
  }, {
    from: { i: 1, j: 4 },
    to: { i: 2, j: 2 },
  }, {
    from: { i: 1, j: 5 },
    to: { i: 2, j: 2 },
  }, {
    from: { i:1, j: 6 },
    to: { i:2, j: 2 },
  }, {
    from: { i:1, j: 7 },
    to: { i: 2, j: 2 },
  }, {
    from: { i: 1, j: 8 },
    to: { i: 2, j: 2 },
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
