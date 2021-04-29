import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Message from "./Message";

let socket;
// const ENDPOINT = "http://localhost:3000";
const ENDPOINT = "https://arman-asif-swap-dealer.herokuapp.com/";

const Chat = ({ userID, name, room }) => {
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.on("preSavedMessages", (preMessage) => {
      if (preMessage) {
        preMessage.forEach((message) => {
          const { userID, name, text, image } = message;
          message.room === room &&
            setMessages((messages) => [
              ...messages,
              { userID, name, text, image },
            ]);
        });
      }
    });

    socket.emit("join", { userID, name, room }, (error) => {
      if (error) {
        console.log(error);
      }
    });

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => socket.disconnect();
  }, [userID, name, room]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (loading) {
      window.alert(`${name}, Please Wait Until Image Is Fully Loaded!`);
    } else if (!message) {
      window.alert(`${name}, Please Enter Your Message.`);
    } else {
      socket.emit("sendMessage", userID, name, room, message, image);
      setImage("");
      setMessage("");
      setLoading(false);
    }
  };

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const uploadFileHandler = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "SwapDealer");

    setLoading(true);
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dectw0gjt/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const imageFile = await response.json();
    setImage(imageFile.secure_url);
    setLoading(false);
  };

  return (
    <div className="">
      <div className="chatBoxHeader">{name}</div>

      <div className="chatBoxContainer" id="scroll">
        {messages.map((message, index) => (
          <div key={index}>
            <Message message={message} currUserID={userID} />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatBoxFooter">
        <div className="uploadButtonWrapper">
          <button>
            <i className="fa fa-plus"></i>
          </button>
          <input
            type="file"
            name="image"
            onClick={(e) => setImage(e.target.value)}
            onChange={uploadFileHandler}
          />
        </div>

        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        <button onClick={(e) => sendMessage(e)}>
          <i className="fa fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Chat;
