
import Board from "../component/board";
import { useEffect, useState } from "react";
import Dice from "../component/Dice.js";
import Notification from "./notification.js";
// import { socket } from "../config/socket.js";
// import { io } from "socket.io-client";
const Game = ({socket,inRoom,player}) => {
//   const socket = io();
const [notification ,setNotification ]= useState(null);
const [winner ,setWinner]=useState(null);
 const [index, setIndex] =useState(0);
  const [game, setGame] = useState({
    Chance: parseInt(0),
    Players: [
      { id: 0, i: 0, j: -1, color: "blue", Name: "Vipin" },
      { id: 1, i: 0, j: -1 , color: "blue", Name: "Mathpal" },
    ],
  });

  const movePlayer = async (newRoll ,UserMove) => {
    // console.log("MoveUSer",newRoll ,UserMove ,game );
     socket.emit("MoveUser",{newRoll,Room:game,index});
     socket.emit("CheckWinner",inRoom);
    //  socket.emit('getRoomDetails',game._id);
//     setGame({...game, chance:game.chance===0?1:0});
//     //  var i= parseInt((player1.i*10+player1.j+1)/10);
//     //  var j= (player1.j+1)%10;

//     // send update request to server 

//     // console.log(newRoll ,User.i*10+User.j , newRoll+User.i*10+User.j);
  
//    var i = MoveUser.i; 
//    var j = MoveUser.j;
//  if(i===0&&j===-1&&newRoll<6){
//   return ;
//  }
 
//  newRoll= (MoveUser.i*10+MoveUser.j)+newRoll;
//   i = parseInt(newRoll/10);
//   j = newRoll % 10;
//  if(newRoll>=100){
//   return ;
//  }
//     // send update request to server 
//     console.log(game);
//     console.log(i, j);
//       // setUser((prev) => ({ ...MoveUser, j:parseInt(j), i:parseInt(i) }));
//   // console.log(game);
//   const players =game.Players;
//   for(let index in players){
//     var player= players[index];
 
//      if(player.id===MoveUser.id){
//   console.log(MoveUser.id);
//         player={...player ,j:parseInt(j), i:parseInt(i) };
//         players.splice(index,1,player);
//         console.log(players);
//      }
//   }
// setGame({...game, Players:players});
     
 
 
  };
  
  useEffect(()=>{
  
 socket.on("SomeOneJoinRoom",(msg)=>{
  setNotification(msg);
  setTimeout(() => {
    setNotification(null);
  }, (2000));
  })
  socket.emit("JoinRoom",inRoom);

  
  socket.on("Winner",(winner)=>{
    // console.log("Winner !!! "+winner);
    setWinner(winner);
    setNotification("Wiiner!!! "+winner);
    setTimeout(() => {
      setNotification(null);
    }, (2000));
  })
  socket.on('ClashAndCut',()=>{
console.log(" One MORE Chance !!!!");
  })
  socket.emit('getRoomDetails',inRoom);
  socket.on('roomDetails',(roomDetails)=>{
    
    // setGame({currentplaying:roomDetails.chance,players:roomDetails.Players});
  
    console.log(roomDetails);
    const id= roomDetails?.Players?.findIndex((p)=>p._id===player._id);
   console.log(id);
   
   setIndex(id);
   setGame(roomDetails);
     console.log("checkS&L");
    socket.emit('CheckS&L',{Room:roomDetails,UserMove:player,index:id});
    console.log("checkedS&L");
 })
  },[])
  return (
    <>

      <div className="Console flex flex-col w-1/6 md:w-2/12  items-center justify-around h-3/6 border rounded-md shadow-xl bg-blue-300 shadow-slate-400">
   {notification &&  <div className="fixed top-0 right-0"><Notification>{notification}</Notification></div>}
        <div className="w-full h-4/6 flex flex-col ">
        <div className="showPlayer text-center border  pt-1 pb-1 pl-2 pe-2 w-90 bg-slate-600 text-white ">PlayerName</div>
        {game?.Players?.map((player) => { 
          return <div className="showPlayer text-center border  pt-1 pb-1 pl-2 pe-2 w-90   ">{player.Name} </div>;
        })}
        </div>
      <div className="2/6 relative"> <Dice  movePlayer={movePlayer}  player={game?.Players[index]} disabled={((index!==game.Chance)||(game.NoOfPlayers<2)||winner)?true :false} ></Dice></div>
      {/* <div className="2/6 relative"> <Dice  movePlayer={movePlayer}  player={game?.players[1]} disabled={game?.players[1]?.id!==game.currentplaying}></Dice></div> */}
      </div>
     <div className="border shadow-lg shadow-gray-600"> <Board  PlayersPostion={game.Players}  ></Board> </div>
    </>
  );
};

export default Game;
