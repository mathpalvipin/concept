import classes from "./comman.module.css";
import Cell from "./Cell.js";

import ladder2 from "../icons/ladder5.png";
import player from "../icons/player.svg";
import { useState } from "react";
import { useEffect } from "react";
const Board = ({ User, PlayersPostion }) => {
  return (
    <>
      <div className={`bg-slate-400  relative ${classes.gamebox}  `}>
        <div className={`absolute z-20 left-0 top-0   ${classes.gamebox}  `}>
          {" "}
          <img className="w-full h-full" src={ladder2} alt="ladder" />
        </div>
        {PlayersPostion?.map((position, index) => {
          return (
            <div
              className={`  ${index===0?"bg-cyan-500":"bg-green-600"} border rounded-2xl w-1/10 flex justify-center
               flex-col items-center absolute h-1/10 z-30  p-2 ease-in duration-500 `}
              style={{
                bottom: `${position.i * 10}%`,
                left: `${
                  position.i % 2 !== 0 ? 90 - position.j * 10 : position.j * 10
                }%`,
              }}
            >
              <div className="w-4/6 h-4/6 ">
                {" "}
                <img src={player} className=""></img>
              </div>
              <div className=" w-4/6 h-4/6 text-xs overflow-x-clip  ">
                {position.Name}
              </div>
            </div>
          );
        })}
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
