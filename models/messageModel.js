import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.ObjectId,
    ref: "Chat",
    required: [true, "Message must belong to a chat"],
  },
  senderId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Message must have a sender"],
  },
  content: {
    type: String,
    required: [true, "Message must have content"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Message = mongoose.model("Message", MessageSchema);
export default Message;