import { useEffect, useState } from "react";
import { getRoom } from "../api.js/api";

import axios from "axios";
const JoinRoom = ({ propplayer, socket , setInRoom}) => {
  const [Room, setRoom] = useState([]);
  const [newRoom, setNewRoom] = useState();
  const handleAddRoom = (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      socket.emit("AddRoom", { Name: newRoom, user });
       
       setInRoom(true);
      //  localStorage.setItem('room',room._id);
    } catch (e) {
      alert("unable to create Room");
    }
  };
  const addToRoom =(room)=>{
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      socket.emit("addToRoom", { room, user });
       setInRoom(true);
      //  localStorage.setItem('room',room._id);
    } catch (e) {
      alert("unable to create Room");
    }
  }
  useEffect(() => {
    socket.on("getRooms", (rooms) => {
      // console.log(rooms);
      setRoom(rooms);
    });
    socket.on("refreshRoomsList", (rooms) => {
      // console.log(rooms);
      setRoom(rooms);
      
    });
  }, []);
  return (
    <div className="  h-full w-full flex justify-center items-center ">
      <div className="flex flex-col justify-around items-center w-3/10 h-5/10 border-2 rounded-xl border-gray-400 shadow-sm bg-green-100 shadow-gray-500 ">
        <div className="w-full bg-black text-white text-center border-2 rounded-xl ">
          {" "}
          JOIN Room{" "}
        </div>
        <div className="w-full h-5/6 overflow-auto text-center border  border-b-black">
          {Room?.map((room) => {
            return (
              <div className=" flex flex-row justify-evenly border-t border-b hover:text-xl hover:bg-green-400 border-gray-400 " onClick={()=>addToRoom(room)}>
                <div >{room.Name}</div>
                <div>
                  {room.NoOfPlayers}/{room.MaxPlayer}
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-full h-3/6 relative flex  justify-evenly items-center bg-white rounded-lg">
          <input
            className="w-3/6 p-2 border border-gray-600 shadow-sm shadow-gray-800 rounded-lg"
            placeholder="Room Name"
            value={newRoom}
            onChange={(e) => {
              setNewRoom(e.target.value);
            }}
          ></input>
          <button
            onClick={handleAddRoom}
            className="w-2/6 button border rounded-lg bg-orange-300 hover:bg-orange-400 text-md  lg:text-lg text-white shadow-md shadow-orange-500  p-1 md:p-2"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
export default JoinRoom;
