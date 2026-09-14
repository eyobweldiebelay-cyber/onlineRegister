
const express=require('express')
const path = require("path");
const db=require('./db/dbConfig')
const cors=require('cors')
const app=express();
app.use(express.json());
app.use(cors());
app.use(
  "/uploads/documents",
  express.static(path.join(__dirname, "uploads/documents"))
);
//authRoute
const authRoute=require('./route/authRoute');
 app.use("/api",authRoute);
 //login route
 const loginRoute=require('./route/authRoute')
 app.use("/api",loginRoute)
 //application Route
 const applicationRoute=require('./route/applicationRoute')
 app.use("/api",applicationRoute);
 //program Route
 const programRoute=require('./route/programRoute')
 app.use("/api",programRoute)
 //document Route
const documentRoute = require("./route/documentRoute");

app.use("/api/documents", documentRoute);
 //paymeny
const paymentRoute = require("./route/paymentRoute");
app.use("/api/payments", paymentRoute);
//comment
const commentRoute =require("./route/commentRoute");

app.use("/api",commentRoute);
const studentRoute=require('./route/studentRoute')
 app.use("/api",studentRoute);
 //student dashboard route
 const dashboardRoute=require('./route/dashboardRoute')
 app.use("/api",dashboardRoute);
 //registrar dashboard route
 const registerDshRoute=require('./route/registerDshRoute')
 app.use('/api',registerDshRoute);
 //report route
 const reportRoute = require('./route/reportRoute');
 app.use('/api/reports', reportRoute);
 //dean dashboard route
 const deanRoute = require('./route/deanRoute');
 app.use('/api/dean', deanRoute);

module.exports=app;