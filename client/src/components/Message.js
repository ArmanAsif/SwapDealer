import React from "react";
import ReactEmoji from "react-emoji";

const Message = ({ message, currUserID }) => {
  const { userID, name, text, image } = message;
  let isSentByCurrentUser = false;

  if (userID === currUserID) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageRight">
      {image && (
        <div className="messageRightTop">
          <div className="messageRightName">{name}</div>
          <img src={image} alt="" />
        </div>
      )}
      {text && (
        <div className="messageRightBottom">
          <div className="messageRightName">{name}</div>
          <div className="messageRightText">{ReactEmoji.emojify(text)}</div>
        </div>
      )}
    </div>
  ) : (
    <div className="messageLeft">
      {image && (
        <div className="messageLeftTop">
          <img src={image} alt="" />
          <div className="messageLeftName">{name}</div>
        </div>
      )}
      {text && (
        <div className="messageLeftBottom">
          <div className="messageLeftText">{ReactEmoji.emojify(text)}</div>
          <div className="messageLeftName">{name}</div>
        </div>
      )}
    </div>
  );
};

export default Message;
