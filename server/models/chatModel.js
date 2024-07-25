import mongoose from "mongoose";


mongoose.connect("mongodb://127.0.0.1:27017/chatApp");

const messageSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  originalName:{
    type:String,
  },
  type:{
    type:String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Message', messageSchema);

export {Message}