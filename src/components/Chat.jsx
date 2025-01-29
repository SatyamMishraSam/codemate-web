import React, { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/socketClient";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [msgs, setMsgs] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const user = useSelector((store) => store.user);
  const loggedInUser = user?._id;

  const fetchChatMsgs = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMsgs = chat?.data?.msgs.map((msg) => {
      return {
        firstName: msg?.senderUserId?.firstName,
        lastName: msg?.senderUserId?.lastName,
        text: msg?.text,
      };
    });
    console.log(chatMsgs);
    setMsgs(chatMsgs);
  };

  useEffect(() => {
    fetchChatMsgs();
  }, []);

  useEffect(() => {
    if (!loggedInUser) {
      return;
    }
    const socket = createSocketConnection();
    // as soon as my component loads emit this event
    // now this event we need to handle backend and same data will be passed to backend also

    socket.emit("joinChat", {
      loggedInUser,
      targetUserId,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    // msgReceived is from backend emit when anybody send the msgs and we are passing firstName and newMSg from backend
    socket.on("msgReceived", ({ firstName, text, lastName }) => {
      console.log(firstName + " : " + newMsg);
      setMsgs((msgs) => [...msgs, { firstName, text, lastName }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [loggedInUser, targetUserId]); //whenever targetUserId or loggedInUser call this becuase will create room seperate

  //   sendMsg will be triggerd when we click on send button and here we are sending one more emmit to backend
  const sendMsg = () => {
    const socket = createSocketConnection();
    socket.emit("sendMsg", {
      loggedInUser,
      targetUserId,
      text: newMsg,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    setNewMsg("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {msgs.map((msg, index) => {
          //   console.log(msg);
          console.log(user.firstName);
          return (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                {msg.firstName + " " + msg.lastName}
              </div>
              <div className="chat-bubble">{msg.text}</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="flex-1 border border-gray-600 text-white rounded p-2"
        />
        <button onClick={sendMsg} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
