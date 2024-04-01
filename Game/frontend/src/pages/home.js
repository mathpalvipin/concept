import { useEffect, useState } from "react";
import Game from "../component/game.js";
import CreatePlayer from "../component/CreatePlayer.js";
import JoinRoom from "../component/RoomJoin.js";
import { socket } from "../config/socket.js";
const Home = () => {
  const [player, setPlayer] = useState(null);
  const [inRoom, setInRoom] = useState(false);
  useEffect(() => {
    socket.connect();

    socket.on("JoinedRoomID", (id) => {
      setInRoom(id);
      console.log(id);
      localStorage.setItem("roomId", id);
    });
    if (localStorage.getItem("player")) {
      const player=JSON.parse(localStorage.getItem("player"));
     
      setPlayer(player);
    }
    if (localStorage.getItem("roomId")) {
      const roomid =localStorage.getItem("roomId");
      setInRoom(roomid);
    }
    return () => {socket.disconnect()};
  }, []);
  return (
    <>
      {!player ? (
        <CreatePlayer setPlayer={setPlayer}></CreatePlayer>
      ) : !inRoom ? (
        <JoinRoom socket={socket} ></JoinRoom>
      ) : (
        <Game socket={socket} inRoom={inRoom} player={player}></Game>
      )}
    </>
  );
};

export default Home;
