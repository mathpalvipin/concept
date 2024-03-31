import { Router } from "express";
const router= Router();
import Player from "../model/Player.js"
import Room from "../model/Room.js"
router.post ('/createPlayer',async(req,res)=>{
    try {
        const name=req.body.name;
        const color = req.body.color?req.body.color:"blue";
        const player= new Player({Name:name, Color:color});
        await player.save();
        res.status(200).json({message:"usercreated",Player:player})
    }
    catch(e){
        console.log(e);
        res.status(400).json({message:e.message});
    }
})
router.get('/getPlayer',async (req,res)=>{
    try {
       const players = await Player.find({});
        res.status(200).json({message:"getPlayer successfully",Players:players})
    }
    catch(e){
        res.status(400).json({message:e.message});
    }
})

router.get('/getRooms',async(req,res)=>{
   try{
    const Rooms = await Room.find({});
    res.status(200).json({message:"Get Room successfully", Rooms:Rooms});
   }
   catch(e){
    res.status(400).json({message:e.messsage});
   }
})

export default  router  ;