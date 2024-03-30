import classes from "./comman.module.css";
import Cell from "./Cell.js";

import ladder2 from "../icons/ladder5.png";
import player from "../icons/player.svg";
import { useState } from "react";
import { useEffect } from "react";
const Board = ({User,PlayersPostion}) => {
  const Cells = [
    { i: 9, j: 1 },
    { i: 9, j: 2 },
    { i: 9, j: 3 },
    { i: 9, j: 4 },
    { i: 9, j: 5 },
    { i: 9, j: 6 },
    { i: 9, j: 7 },
    { i: 9, j: 8 },
    { i: 9, j: 9 },
    { i: 9, j: 10 },
    { i: 8, j: 1 },
    { i: 8, j: 2 },
    { i: 8, j: 3 },
    { i: 8, j: 4 },
    { i: 8, j: 5 },
    { i: 8, j: 6 },
    { i: 8, j: 7 },
    { i: 8, j: 8 },
    { i: 8, j: 9 },
    { i: 8, j: 10 },
    { i: 7, j: 1 },
    { i: 7, j: 2 },
    { i: 7, j: 3 },
    { i: 7, j: 4 },
    { i: 7, j: 5 },
    { i: 7, j: 6 },
    { i: 7, j: 7 },
    { i: 7, j: 8 },
    { i: 7, j: 9 },
    { i: 7, j: 10 },
    { i: 6, j: 1 },
    { i: 6, j: 2 },
    { i: 6, j: 3 },
    { i: 6, j: 4 },
    { i: 6, j: 5 },
    { i: 6, j: 6 },
    { i: 6, j: 7 },
    { i: 6, j: 8 },
    { i: 6, j: 9 },
    { i: 6, j: 10 },
    { i: 5, j: 1 },
    { i: 5, j: 2 },
    { i: 5, j: 3 },
    { i: 5, j: 4 },
    { i: 5, j: 5 },
    { i: 5, j: 6 },
    { i: 5, j: 7 },
    { i: 5, j: 8 },
    { i: 5, j: 9 },
    { i: 5, j: 10 },
    { i: 4, j: 1 },
    { i: 4, j: 2 },
    { i: 4, j: 3 },
    { i: 4, j: 4 },
    { i: 4, j: 5 },
    { i: 4, j: 6 },
    { i: 4, j: 7 },
    { i: 4, j: 8 },
    { i: 4, j: 9 },
    { i: 4, j: 10 },
    { i: 3, j: 1 },
    { i: 3, j: 2 },
    { i: 3, j: 3 },
    { i: 3, j: 4 },
    { i: 3, j: 5 },
    { i: 3, j: 6 },
    { i: 3, j: 7 },
    { i: 3, j: 8 },
    { i: 3, j: 9 },
    { i: 3, j: 10 },
    { i: 2, j: 1 },
    { i: 2, j: 2 },
    { i: 2, j: 3 },
    { i: 2, j: 4 },
    { i: 2, j: 5 },
    { i: 2, j: 6 },
    { i: 2, j: 7 },
    { i: 2, j: 8 },
    { i: 2, j: 9 },
    { i: 2, j: 10 },
    { i: 1, j: 1 },
    { i: 1, j: 2 },
    { i: 1, j: 3 },
    { i: 1, j: 4 },
    { i: 1, j: 5 },
    { i: 1, j: 6 },
    { i: 1, j: 7 },
    { i: 1, j: 8 },
    { i: 1, j: 9 },
    { i: 1, j: 10 },
    { i: 0, j: 1 },
    { i: 0, j: 2 },
    { i: 0, j: 3 },
    { i: 0, j: 4 },
    { i: 0, j: 5 },
    { i: 0, j: 6 },
    { i: 0, j: 7 },
    { i: 0, j: 8 },
    { i: 0, j: 9 },
    { i: 0, j: 10 },
  ];


  return (
    <>
      <div className={`bg-slate-400  relative ${classes.gamebox}  `}>
        <div className={`absolute z-20 left-0 top-0   ${classes.gamebox}  `}>
          {" "}
          <img className="w-full h-full" src={ladder2} alt="ladder" />
        </div>
       { PlayersPostion?.map(position=> {return (<div
          className="w-1/10 flex justify-center flex-col items-center absolute h-1/10 z-30  p-1 ease-in duration-200 "
          style={{
            bottom: `${position.i * 10}%`,
            left: `${
                position.i % 2 !== 0
                ? 90 - (position.j ) * 10
                : (position.j ) * 10
            }%`,
          }}
        >
          <div className="w-4/6 h-4/6 ">
            {" "}
            <img src={player}></img>
          </div>
          <div className=" w-4/6 h-4/6 text-xs overflow-x-clip  ">{position.name}</div>
        </div>
        )})}
        {/* {Cells.map((cell, index) => {
          var bottom = cell.i * 10;

          let r = cell.i % 2 !== 0;
          var left = r ? 90 - (cell.j - 1) * 10 : (cell.j - 1) * 10;
          return (
            <div
              key={cell.i + "-" + cell.j}
              className={`absolute z-1  w-1/10 h-1/10 bg-cyan-300 `}
              style={{
                bottom: `${bottom}%`,
                left: `${r ? left + "%" : left + "%"}`,
              }}
            >
              <Cell i={cell.i} j={cell.j} index={index}></Cell>
            </div>
          );
        })} */}
      </div>
    </>
  );
};

export default Board;
