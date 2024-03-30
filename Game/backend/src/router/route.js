 import { Router } from "express";
 const router= Router();
 import Task from "../model/task.js"
 router.get("/getTask", async(req,res)=>{
    const page= parseInt(req.query.page) ||1;
    const pagesize=10;
    const skip =(page-1)*pagesize;


   try{ const tasks =await Task.find().skip(skip).limit(pagesize).exec();

    const countalldocument=  await Task.countDocuments();
    const totalpage= countalldocument/pagesize;

    setTimeout(() => {
        res.status(200).json({data:tasks,nextPage:page<totalpage?page+1:null});
       }, 500);
      }catch(e){
         console.log(e);
res.json({error:e});
      }
 })
 router.get("/getEvent", async(req,res)=>{
    const tasks =await Task.find();
    tasks.reverse();
   setTimeout(() => {
    res.status(200).json({Tasks:tasks});
   }, 2000);
 })

 export default  router;