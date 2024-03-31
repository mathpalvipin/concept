
import Board from "../component/board";
import { useEffect, useState } from "react";
import Dice from "../component/Dice.js";
// import { socket } from "../config/socket.js";
// import { io } from "socket.io-client";
const Game = ({socket}) => {
//   const socket = io();
 
  const [game, setGame] = useState({
    currentplaying: 0,
    players: [
      { id: 0, i: 0, j: -1, color: "blue", name: "Vipin" },
      { id: 1, i: 0, j: -1 , color: "blue", name: "Mathpal" },
    ],
  });

  const movePlayer = (newRoll ,MoveUser) => {
    setGame({...game, currentplaying:game.currentplaying===0?1:0});
    //  var i= parseInt((player1.i*10+player1.j+1)/10);
    //  var j= (player1.j+1)%10;

    // send update request to server 

    // console.log(newRoll ,User.i*10+User.j , newRoll+User.i*10+User.j);
  
   var i = MoveUser.i; 
   var j = MoveUser.j;
 if(i===0&&j===-1&&newRoll<6){
  return ;
 }
 
 newRoll= (MoveUser.i*10+MoveUser.j)+newRoll;
 console.log()
  i = parseInt(newRoll/10);
  j = newRoll % 10;
 if(newRoll>=100){
  return ;
 }
    // send update request to server 
    
    console.log(i, j);
      // setUser((prev) => ({ ...MoveUser, j:parseInt(j), i:parseInt(i) }));
  // console.log(game);
  const players =game.players;
  for(let index in players){
    var player= players[index];
 
     if(player.id===MoveUser.id){
  console.log(MoveUser.id);
        player={...player ,j:parseInt(j), i:parseInt(i) };
        players.splice(index,1,player);
        console.log(players);
     }
  }
setGame({...game, players:players});
     
 
 
  };
  
  useEffect(()=>{
 socket.on("SomeOneJoinRoom",(msg)=>{

  alert("message"+msg);
 })
  },[])
  return (
    <>
      <div className="Console flex flex-col w-1/6 md:w-2/12  items-center justify-around h-3/6 border rounded-md shadow-xl bg-blue-300 shadow-slate-400">
        <div className="w-full h-4/6 flex flex-col ">
        <div className="showPlayer text-center border  pt-1 pb-1 pl-2 pe-2 w-90 bg-slate-600 text-white ">PlayerName</div>
        {game?.players?.map((player) => {
          return <div className="showPlayer text-center border  pt-1 pb-1 pl-2 pe-2 w-90   ">{player.name}</div>;
        })}
        </div>
      <div className="2/6 relative"> <Dice  movePlayer={movePlayer}  player={game.players[0]} disabled={game.players[0].id!==game.currentplaying} ></Dice></div>
      <div className="2/6 relative"> <Dice  movePlayer={movePlayer}  player={game.players[1]} disabled={game.players[1].id!==game.currentplaying}></Dice></div>
      </div>
     <div className="border shadow-lg shadow-gray-600"> <Board  PlayersPostion={game.players} ></Board> </div>
    </>
  );
};

export default Game;
