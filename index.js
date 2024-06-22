const express = require('express');
const os = require('os');
const cluster = require('node:cluster');

const app = express();
const port = 2000;

const totalCPU = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < totalCPU; i++) {
      cluster.fork();
    }
} else{
    app.get("/", (req,res)=>{
        res.end("Hey there!")
    });
    
    app.listen(port, ()=>{
        console.log(`server started at ${port}`);
    });
}