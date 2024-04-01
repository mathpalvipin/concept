import { useState } from "react";
import { createPlayerAPI } from "../api.js/api";
import axios from "axios";
const CreatePlayer = ({ setPlayer }) => {
  const [user, setUser]  = useState({Name:"",Color:""});
  const handleCreatePlayer = async (e) => {
    e.preventDefault();
    // console.log(user);
    try {
      
      const createplayer = await axios.post(createPlayerAPI, user);
      console.log(createplayer);
      //  localStorage.setItem('userId' , createplayer?.data?.Player?._id);
      localStorage.setItem("player", JSON.stringify(createplayer?.data?.Player));
      setPlayer(createplayer?.data?.Player);
    } catch (e) {
      console.log(e);
      alert("unable to create player");
    }
  };

  return (
    <div className="  h-full w-full flex justify-center items-center ">
      <div className="flex flex-col justify-between items-center w-3/10 h-5/10 border-2 rounded-xl border-gray-400 shadow-sm bg-white shadow-gray-500 ">
        <label className="w-full h-auto bg-black text-lg text-white text-center border-2 rounded-xl  ">
          Create Player
        </label>
        <div className="w-5/6 h-5/6 relative flex flex-col justify-evenly items-center">
          <div><label className="w-full    text-center ">Enter Name</label>
          <input
            className="w-full p-2 border border-gray-600 shadow-sm shadow-gray-800 rounded-lg"
            placeholder="Name"
            value={user?.Name}
            onChange={(e) => setUser({ ...user, Name: e.target.value })}
          ></input>
          </div>
          
          {/* <div><label className="w-full    text-center ">Choose Color</label>
          <input
            className="w-full p-2 border border-gray-600 shadow-sm shadow-gray-800 rounded-lg"
            placeholder="color"
            value={player?.color}
            onChange={(e) => setPlayer({ ...player, color: e.target.value })}
          ></input>
</div> */}
          <button
            className=" button border rounded-lg bg-orange-300 hover:bg-orange-400 text-lg  lg:text-lg text-white shadow-md shadow-orange-500  p-1 md:p-2"
            onClick={handleCreatePlayer}
          >
            Create Player
          </button>
        </div>
      </div>
    </div>
    
  );
};
export default CreatePlayer;
