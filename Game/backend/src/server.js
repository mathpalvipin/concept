 import express from "express"
 import {connect } from "mongoose"
import router from "./router/route.js"
 import {mongoURI} from "./config/config.js"
 import bodyParser from "body-parser"
 import cors from "cors";
 const app =express();
 const PORT = process.env.PORT || 5000;
 app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
 app.use(bodyParser.json());
 app.use(express.static("public"));
 app.use(
   bodyParser.urlencoded({
     extended: true,
   })
 );
 connect(mongoURI)
app.use(router);
 app.listen(PORT,()=>{
    console.log("App run on  "+PORT);
 });

