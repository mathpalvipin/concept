import React, { useEffect, useState } from 'react';

const Dice = ({movePlayer,disabled,player}) => {
   const [currentRoll,setCurrentRoll] =useState(1);
 console.log(disabled,player);
  const rollDice = () => {
    const newRoll = Math.floor(Math.random() * 6) + 1;
    setCurrentRoll(newRoll);
    movePlayer(newRoll,player);
  };

  return (
    <div className=' w-full h-full flex flex-col justify-center items-center'>
    
      
      <div style={{ fontSize: '10vh', textAlign: 'center'}}>
        {renderDiceFace(currentRoll)}
      </div>
      <h2>Dice Roll: {currentRoll}</h2>
      <button disabled={disabled} className='button bg-orange-400 p-1 mb-2 border rounded-md text-white shadow-md shadow-orange-100' onClick={rollDice}>Roll Dice</button>
    </div>
  );
};

const renderDiceFace = roll => {
  switch (roll) {
    case 1:
      return (
        <span role="img" aria-label="dice-face" className='h-10'>⚀</span>
      );
    case 2:
      return (
        <span role="img" aria-label="dice-face">⚁</span>
      );
    case 3:
      return (
        <span role="img" aria-label="dice-face">⚂</span>
      );
    case 4:
      return (
        <span role="img" aria-label="dice-face">⚃</span>
      );
    case 5:
      return (
        <span role="img" aria-label="dice-face">⚄</span>
      );
    case 6:
      return (
        <span role="img" aria-label="dice-face">⚅</span>
      );
    default:
      return null;
  }
};

export default Dice;
