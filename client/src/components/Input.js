import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import AttachmentIcon from "@mui/icons-material/Attachment";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { IconButton } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import io from "socket.io-client";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { storage } from "../Config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

// Define the endpoint for your Socket.IO server
const ENDPOINT = "http://localhost:5000";

export default function Input({ handleSend, roomId,status }) {
  const [message, setMessage] = useState("");
  const [, setSocket] = useState(null);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [, setProgress] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  async function handleClick() {
    if (file) {
      const storageRef = ref(storage, `bufferdata/${message}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      const fileType = message.split(".").pop();

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        }
      );
      try {
        // Use the uploadTask.then to wait until the upload is completed
        await uploadTask.then();
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        handleSend(downloadURL, message, fileType);
      } catch (err) {
        console.log(err);
      }
      setFile(null);
      setMessage("");
    } else {
      handleSend(message, "textMessage");
      setMessage("");
    }
  }

  const handleEmojiSelect = (emoji) => {
    setMessage((prevValue) => prevValue + emoji.native);
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  function handleFileChange(e) {
    const fileName = e.target.files[0].name;

    if (fileName) {
      setMessage(fileName);
      setFile(e.target.files[0]);
    }
  }

  return (
    <div className="Input">
      <div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
        />
        <IconButton onClick={handleFileUpload}>
          <AttachmentIcon sx={{ color: "rgb(0, 209, 105)" }} />
        </IconButton>
        <input
          type="text"
          value={message}
          placeholder="Write message...."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <IconButton onClick={() => setOpen((prev) => !prev)}>
          <EmojiEmotionsOutlinedIcon sx={{ color: "rgb(0, 209, 105)" }} />
        </IconButton>
      </div>
      <div
        className="emoji-picker"
        style={{ display: open ? "inline" : "none" }}
      >
        <Picker data={data} onEmojiSelect={handleEmojiSelect} />
      </div>
      <IconButton onClick={handleClick}>
        <SendRoundedIcon sx={{ color: "blue" }} type="submit" />
      </IconButton>
    </div>
  );
}
