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