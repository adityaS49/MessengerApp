import React, { useEffect, useState ,useRef} from "react";
import { user, a } from "../Join/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
let socket;

const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };
  console.log(messages);

  useEffect(() => {
    console.log(a);
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on(
      "connect",
      () => {
        // alert("Connected");
        setId(socket.id);
      },
      [socket]
    );

    console.log(socket);

    socket.emit("joined", { user, a });

    // socket.on("welcome", (data) => {
    //   setMessages([...messages, data]);
    //   console.log(data.user, data.message);
    // });

    socket.on("userJoined", (data) => {
      // setMessages([...messages, data]);
      console.log(data.user, data.message,data.image);
    });

    socket.on("leave", (data) => {
      // setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnects");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };
  return (
    <>
      <div className="user-status-container">
        <div>
        {console.log(a)}
          <img src={a} alt="" />
        </div>
        <div>
          <h1>{user}</h1>
        </div>
        <div className="onlineBox">
          <p>Online</p>
        </div>
        <div className="status-indicator online"></div>
      </div>
      <div class="chat-container flex flex-col justify-between gap-5rem">
        <div class="chat" ref={messagesContainerRef}>
          <ReactScrollToBottom className="chatBox">
            {messages.map((item) => (
              <Message
                class="message right"
                key={Date.now()}
                classs={item.id === id ? "right" : "left"}
                user={item.id === id ? "" : item.user}
                message={item.message}
                image={item.image}
              />
            ))}
          </ReactScrollToBottom>
        </div>
        <input
          class="text_input"
          placeholder="Message..."
          onKeyPress={(event) => (event.key === "Enter" ? send() : null)}
          type="text"
          id="chatInput"
        />
      </div>
    </>
  );
};

export default Chat;
