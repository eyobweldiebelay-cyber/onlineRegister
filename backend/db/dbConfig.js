const mysql = require('mysql2');

const online = {
  user: process.env.USER_NAME,
  host: process.env.HOST_NAME,
  password: process.env.PASS,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),

  ssl: {
    rejectUnauthorized: false
  }
    
};

const db = mysql.createPool(online);

db.getConnection(function(err, connection) {
  if (err) {
    console.log("Database connection failed:", err.message);
  } else {
    console.log("Connected to Aiven MySQL");
    connection.release();
  }
});

module.exports = db.promise();

/*
const mysql=require('mysql2')
const path = require('path');
//create parammeter 
const online={
  user:process.env.USER_NAME,
  host:process.env.HOST_NAME,
  password:process.env.PASS,
   database:process.env.DB_NAME

};
//establish connection
const db=mysql.createPool(online);
//check connection
db.getConnection(function(err){
    if (err) {
        console.log("faield");
        
    }
    else{
        console.log("connected")
    }
})
module.exports=db.promise();
/*

SECURT_KEY=onlineeyoba
DB_NAME=online
PORT=8800
HOST_NAME=localhost
PASS=online
USER_NAME=online
*/