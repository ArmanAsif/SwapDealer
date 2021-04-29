import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    room: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
