 import { Router } from "express";
 const router= Router();
 import Task from "../model/task.js"
 router.get("/getTask", async(req,res)=>{
    const page= req.query.page||1;
    const skip =(page-1)*pagesize;


    const tasks =await Task.find().skip(skip).limit(pagesize).exe();

    const countalldocument=  await Task.countDocumnets();
    const totalpage= countalldocument/pagesize;

    setTimeout(() => {
        res.status(200).json({Tasks:tasks,nextPage:page<totalpage?page+1:null});
       }, 1000);
 })
 router.get("/getEvent", async(req,res)=>{
    const tasks =await Task.find();
    tasks.reverse();
   setTimeout(() => {
    res.status(200).json({Tasks:tasks});
   }, 1000);
 })

 export default  router;