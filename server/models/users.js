import mongoose from "mongoose";


mongoose.connect("mongodb://127.0.0.1:27017/chatApp");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    img: {
      type:String  
    },
  });


const User = mongoose.model("User", userSchema);

export {User}
