const express = require('express');
const app=express();
var http= require('http');
const server = http.createServer(app);
const cors = require('cors');
const PORT =process.env.PORT || 5000;
const io = require('socket.io')(server,{
  cors:
  {
    origin:"*"
  }
});

//middlewares
app.use(express.json());
app.use(cors());
var clients={};

io.on("connection",(socket)=>{
  console.log("connected");
  console.log(socket.id,"has joined");

  socket.on("signin",(id)=>{
  console.log(id);
  clients[id]=socket;
  console.log(clients);
  });

  socket.on("message",(msg)=>{
    console.log(msg);
    let targetid =msg.targetid;
    if(clients[targetid])
      clients[targetid].emit("message",msg);
  });
  
});

app.route("/check").get((req,res)=>{
  return res.json("your app is working fine");
});

server.listen(PORT,"0.0.0.0",()=>{
  console.log("server connected to port ");
})