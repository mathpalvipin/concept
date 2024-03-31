 import express from "express"
 import {connect } from "mongoose"
// import router from "./router/route.js" 
import GameRoute from "./router/gameroute.js"
import { Server } from 'socket.io';
import http from  'http';
import { addToRoom, getRoom } from "./router/helper.js";
import { createRoom } from "./router/helper.js";


// import gameroute from "./router/gameroute.js"
 import {mongoURI} from "./config/config.js"
 import bodyParser from "body-parser"
 import cors from "cors";
 
 const app =express();
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
 connect(mongoURI)

  //socket.io 
  const server = http.createServer(app);
 const io = new Server(server, { cors:{  origin: "http://localhost:3000" }});
 io.on('connection', async(socket) => {
  
   try{const room=await getRoom();
    socket.emit('getRooms',room);
  }
  catch(e){
    console.log(e);
    socket.emit('Error', "unable to get room");
  }
 
  console.log('a user connected');
  socket.on('AddRoom',async(Data)=>{
    try{
      const {Name,user }=Data;
     const Room= await createRoom({Name:Name,user});
     const RoomID=Room._id.toString();
      const room=await getRoom();
      socket.emit('getRoomId',RoomID);


 socket.join(RoomID);
     io.emit("refreshRoomsList",room);
    }
    catch(e){
      console.log(e);
      socket.emit('Error', "unaable to create Room");
    }
  })
  socket.on('addToRoom',async(Data)=>{
    try{
      const {room:RoomToAdd,user }=Data;
    await addToRoom({user,RoomToAdd});
      const room=await getRoom();
    //  socket.emit('getRooms',room);
    socket.emit('getRoomId',RoomToAdd._id);
   
    io.to(RoomToAdd._id).emit("SomeOneJoinRoom","SomeOneJoinRoom");
    // console.log(RoomToAdd._id);
    socket.join(RoomToAdd._id);
     io.emit("refreshRoomsList",room);
    }
    catch(e){
      console.log(e);
      socket.emit('Error', "unaable to create Room");
    }
  })
});



app.use(GameRoute);
// app.use(gameroute);
 server.listen(PORT,()=>{
    console.log("App run on  "+PORT);
 });

