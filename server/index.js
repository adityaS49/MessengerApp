const http=require("http");
const express =require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app=express();
const port= 4500|| process.env.PORT ;

const users=[{}];
const images = [{}];
app.use(cors());
app.get("/",(req,res)=>{
    res.send("HELL ITS WORKING");
})

const server=http.createServer(app);

const io=socketIO(server);

io.on("connection",(socket)=>{
    console.log("New Connection");
    socket.on('joined',({user,a})=>{
          users[socket.id]= user;
          images[socket.id] = a;
          console.log(`${user} has joined `);
          socket.broadcast.emit('userJoined',{user:"Admin",image: images[socket.id], message:` ${users[socket.id]} has joined`});
        //   socket.emit('welcome',{user:"Admin",message:`Welcome to the chat, ${users[socket.id]} `})
    })

    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id, image:images[id]});
    })

    socket.on('disconnects',()=>{
          socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]}  has left`});
        console.log(`user left`);
    })
});


server.listen(port,()=>{
    console.log(`Working`);
})