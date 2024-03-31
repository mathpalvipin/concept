
import { useEffect, useState } from "react";
import Game from "../component/game.js";
import CreatePlayer from "../component/CreatePlayer.js";
import JoinRoom from "../component/RoomJoin.js";
import {socket} from "../config/socket.js"
const Home = () => {
  const [player,setPlayer] =useState(null);
  const [isPlayerExist ,setIsPlayerExist]= useState(false);
  const [inRoom ,setInRoom]= useState(false);
 useEffect(()=>{
  socket.connect();

  socket.on("getRoomId", (id) => {
    setInRoom(id);
    localStorage.setItem('room',id);
  });
  if(localStorage.getItem('user')){
    
    setPlayer(localStorage.getItem('user'));
    setIsPlayerExist(true);
  
    
  }
  if(localStorage.getItem('room')){
  
    setInRoom(localStorage.getItem('room'));
  }
  return () => {
   
  };
 },[player])
  return (
   <>
   {!isPlayerExist?
   <CreatePlayer propplayer={{player,setPlayer}}></CreatePlayer>:
   !inRoom? <JoinRoom socket={socket} setInRoom={setInRoom}></JoinRoom>:
   <Game socket={socket} inRoom={inRoom}  player={player}></Game>
}</>
  
  );
};

export default Home;
