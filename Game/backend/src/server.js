import express from "express";
import { connect } from "mongoose";
// import router from "./router/route.js"
import GameRoute from "./router/gameroute.js";
import { Server } from "socket.io";
import http from "http";
import {
  addToRoom,
  checkSandL,
  getRoom,
  getRoomDetails,
  updateRoom,
} from "./router/helper.js";
import { createRoom } from "./router/helper.js";

// import gameroute from "./router/gameroute.js"
import { mongoURI } from "./config/config.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ credentials: true, origin: "*" }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//mongo connnet
connect(mongoURI);

//socket.io
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
io.on("connection", async (socket) => {
  //fetch all Room  exists in database and send to client site  connect now .
  socket.on("getRooms", async () => {
    try {
      const Rooms = await getRoom();
      socket.emit("Rooms", Rooms);
    } catch (e) {
      console.log(e);
      socket.emit("Error", "unable to fetch  rooms");
    }
  });
  console.log("a user connected");

  // create Room   and send Room to all client connected to server.
  socket.on("AddRoom", async (Data) => {
    try {
       
      const { Name, player } = Data;
      const Room = await createRoom({ Name, player });
      const RoomID = Room._id.toString();
      const rooms = await getRoom();
     

      socket.join(RoomID); //let client join the Room with ROOMID.
      socket.emit("JoinedRoomID", RoomID);
      io.emit("Rooms", rooms); //send to all client connect to server
    } catch (e) {
      console.log(e);
      socket.emit("Error", "unaable to create Room");
    }
  });
  socket.on("addToRoom", async (Data) => {
    try {
      const { room: InRoom, player } = Data;
      await addToRoom({ player, InRoom });
       
       const room = await getRoomDetails(InRoom._id);
      //  socket.emit('getRooms',room);
    
      io.to(InRoom._id).emit("SomeOneJoinRoom", player.Name+" Join your Room");
      // console.log(RoomToAdd._id);
      socket.join(InRoom._id);
      socket.emit("JoinedRoomID",InRoom._id);
      io.to(InRoom._id).emit("roomDetails", room);
    } catch (e) {
      console.log(e);
      socket.emit("Error", "unaable to Add to  Room");
    }
  });

  socket.on("getRoomDetails", async (RoomID) => {
    try {
      const roomDetails = await getRoomDetails(RoomID);
      socket.emit("roomDetails", roomDetails);
    } catch (e) {
      socket.emit("Error", "unaable to gEt room details ");
    }
  });
  socket.on('CheckWinner',async (RoomID)=>{
    try {
      const roomDetails = await getRoomDetails(RoomID);
      
      if(!!roomDetails.Winner){
        console.log(roomDetails.Winner );
        io.to(RoomID).emit("Winner", roomDetails.Winner);
       }
    } catch (e) {
      socket.emit("Error", "unaable to gEt room details ");
    }
  })
  socket.on('JoinRoom',async(RoomID)=>{
    socket.join(RoomID);
  })
  socket.on("MoveUser", async (Data) => {
    try {
       const { Room, newRoll, index } = Data;
     //  console.log(Data);

      var i = Room.Players[index].i;
      var j = Room.Players[index].j;

        //starter logic
         // open on 1 and 6 only 
      //  if(i===0&&(j===-1||j==-2)&&(newRoll<6&&newRoll>1)){
      //   return ;
      //  }


      // console.log(
      //   newRoll,
      //   UserMove.i * 10 + UserMove.j,
      //   newRoll + UserMove.i * 10 + UserMove.j
      // );

      // count and update locaiton {i,j}  
      var steps = i * 10 + j + newRoll;

      i = parseInt(steps / 10);
      j = steps % 10;
      if (steps >= 100) {
        await updateRoom({...Room,Chance:Room.Chance==0?1:0});
        io.to(Room._id).emit("roomDetails", {...Room,Chance:Room.Chance==0?1:0});
        return;
      }
     


  ///upate player location 
      var PlayerMoved = { ...Room.Players[index], i: i, j: j };

      // console.log(Room)
      // io.to(Room._id).emit("takeRoomDetails",Room);

      //update location in  Room 
      var P = Room.Players;
      P.splice(index, 1, PlayerMoved);  
      const updatedRoomDetails = {
        ...Room,
        Chance: (index + 1) % 2,
        Players: P,
      };
      if (steps === 99) {
        console.log(steps);
        await updateRoom({...updatedRoomDetails,Winner:"vipin"});
      }
      else await updateRoom(updatedRoomDetails);

      // console.log(updatedRoomDetails)
      io.to(Room._id).emit("roomDetails", updatedRoomDetails);

      //check if two clash
      var is=Room.Players[(index+1)%2].i;
      var js=Room.Players[(index+1)%2].j;
      if(i===is &&  j===js){
        const indexS =(index+1)%2;
        
         var UserMoved = { ...Room.Players[indexS], i: 0, j:-1 };
         var P = Room.Players;
         P.splice(indexS, 1, UserMoved);
         // console.log(Room);
   
         const updatedRoomDetails = {
           ...Room,
           Players: P,
         };
         await updateRoom(updatedRoomDetails);
         io.to(Room._id).emit("roomDetails", updatedRoomDetails);
         socket.emit('ClashAndCut');
  
        }
    } catch (e) {
      console.log(e.message);
      socket.emit("Error", "unaable to move uesr details ");
    }
  });

  socket.on("CheckS&L", async(Data) => {
    // console.log("checkS&L", Data);
    const { Room,index } = Data;
    var i = Room?.Players[index]?.i;
      var j = Room?.Players[index]?.j;
    
     
    const jump = checkSandL({ i,j });
    console.log(jump);
    if (jump) {
      // console.log(Data);
      var UserMoved = { ...Room.Players[index], i: jump.i, j: jump.j };
      var P = Room.Players;
      P.splice(index, 1, UserMoved);
      // console.log(Room);

      const updatedRoomDetails = {
        ...Room,
        Players: P,
      };
      await updateRoom(updatedRoomDetails);
      io.to(Room._id).emit("roomDetails", updatedRoomDetails);
    }
  });
});

app.use(GameRoute);
// app.use(gameroute);
server.listen(PORT, () => {
  console.log("App run on  " + PORT);
});
