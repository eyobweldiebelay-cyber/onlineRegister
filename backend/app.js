const express=require('express')
const db=require('./db/dbConfig')
const cors=require('cors')
const app=express()
app.use(express.json());
app.use(cors());
//authRoute
const authRoute=require('./route/authRoute');
 app.use("/api",authRoute);
 //application Route
 const applicationRoute=require('./route/applicationRoute')
 app.use("/api",applicationRoute);
 //program Route
 const programRoute=require('./route/programRoute')
 app.use("/api",programRoute)
 //document Route
 const documentRoute=require('./route/documentRoute')
 app.use("/api",documentRoute)
 

module.exports=app;