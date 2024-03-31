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
} from "./router/helper.js";
import { createRoom } from "./router/helper.js";

// import gameroute from "./router/gameroute.js"
import { mongoURI } from "./config/config.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
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
const io = new Server(server, { cors: { origin: "http://localhost:3000" } });
io.on("connection", async (socket) => {
  try {
    const room = await getRoom();
    socket.emit("getRooms", room);
  } catch (e) {
    console.log(e);
    socket.emit("Error", "unable to get room");
  }

  console.log("a user connected");
  socket.on("AddRoom", async (Data) => {
    try {
      const { Name, user } = Data;
      const Room = await createRoom({ Name: Name, user });
      const RoomID = Room._id.toString();
      const room = await getRoom();
      socket.emit("getRoomId", RoomID);

      socket.join(RoomID);

      io.emit("refreshRoomsList", room);
    } catch (e) {
      console.log(e);
      socket.emit("Error", "unaable to create Room");
    }
  });
  socket.on("addToRoom", async (Data) => {
    try {
      const { room: RoomToAdd, user } = Data;
      await addToRoom({ user, RoomToAdd });
      const room = await getRoomDetails(RoomToAdd._id);
      //  socket.emit('getRooms',room);

      io.to(RoomToAdd._id).emit("SomeOneJoinRoom", "SomeOneJoinRoom");
      // console.log(RoomToAdd._id);
      socket.join(RoomToAdd._id);

      console.log(room);
      io.to(RoomToAdd._id).emit("takeRoomDetails", room);
    } catch (e) {
      console.log(e);
      socket.emit("Error", "unaable to Add to  Room");
    }
  });

  socket.on("getRoomDetails", async (RoomID) => {
    try {
      const roomDetails = await getRoomDetails(RoomID);
      socket.emit("takeRoomDetails", roomDetails);
    } catch (e) {
      socket.emit("Error", "unaable to gEt room details ");
    }
  });
  socket.on("MoveUser", async (Data) => {
    try {
      const { Room, newRoll, UserMove, index } = Data;
      // console.log(Data);

      var i = UserMove.i;
      var j = UserMove.j;
      //  if(i===0&&(j===-1||j==-2)&&(newRoll<6&&newRoll>1)){
      //   return ;
      //  }
      console.log(
        newRoll,
        UserMove.i * 10 + UserMove.j,
        newRoll + UserMove.i * 10 + UserMove.j
      );
      var steps = UserMove.i * 10 + UserMove.j + newRoll;

      i = parseInt(steps / 10);
      j = steps % 10;
      if (steps >= 100) {
        return;
      }

      var UserMoved = { ...UserMove, i: i, j: j };

      // console.log(Room)
      // io.to(Room._id).emit("takeRoomDetails",Room);

      var P = Room.Players;

      P.splice(index, 1, UserMoved);
      const updatedRoomDetails = {
        ...Room,
        Chance: (index + 1) % 2,
        Players: P,
      };
      // console.log(updatedRoomDetails)
      io.to(Room._id).emit("takeRoomDetails", updatedRoomDetails);
    } catch (e) {
      console.log(e.message);
      socket.emit("Error", "unaable to move uesr details ");
    }
  });
  socket.on('CheckS&L',(Data)=>{
    console.log("checkS&L" ,Data);
    const { Room,UserMove, index } = Data;
    var i = UserMove.i;
    var j = UserMove.j;
    const jump= checkSandL({i:i,j:j});
      if (jump) {
        console.log(Data);
        var UserMoved = { ...UserMove, i: jump.i, j: jump.j };
        var P = Room.Players;
        P.splice(index, 1, UserMoved);
        console.log(Room);      




        const updatedRoomDetails = {
          ...Room,
          Players: P,
        };
        io.to(Room._id).emit("takeRoomDetails", updatedRoomDetails);
      }
    
  })
});

app.use(GameRoute);
// app.use(gameroute);
server.listen(PORT, () => {
  console.log("App run on  " + PORT);
});
