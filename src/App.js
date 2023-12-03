import socketIO from "socket.io-client";
// import { Router } from "express";
import "./App.css";
import Join from "./component/Join/Join";
import { Routes, Route } from "react-router-dom"
import Chat from "./component/Chat/Chat";
const ENDPOINT = "http://localhost:4500/";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
function App() {
  socket.on("connect", () => {
    console.log("New Connection");
  });
  return (
    <div className="App">
    <Routes>
       <Route exact path = "/" element={<Join/>}/>
      <Route path="/chat" element = {<Chat/>}/>
    </Routes>
     
    </div>
  );
}

export default App;
