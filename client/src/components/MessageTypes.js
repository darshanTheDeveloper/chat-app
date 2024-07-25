import React from "react";
import txt from "../assets/file-types/txt.png";
import pdf from "../assets/file-types/pdf.png";
import doc from "../assets/file-types/doc.png";
import zip from "../assets/file-types/zip.png";
import { DownloadRounded } from "@mui/icons-material";
import "./styles.css";

export function ImageFiles({ src, alignContent, message, color }) {
  return (
    <div
      style={{ display: "flex", justifyContent: alignContent, color }}
      className="ImageFiles msg"
    >
      <div style={{ borderColor: color.backgroundColor }}>
        <img src={src} alt="" />
        <p>
          {new Date(message.timestamp).toLocaleTimeString("US-en", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <a href={message.content} download>
          <DownloadRounded />
        </a>
      </div>
    </div>
  );
}

export function TextMessage({ textMessage, alignContent, message, color }) {
  return (
    <div
      style={{ display: "flex", justifyContent: alignContent }}
      className="TextMessages  msg"
    >
      <div style={color}>
        <p>{textMessage}</p>
        <p>
          {new Date(message.timestamp).toLocaleTimeString("US-en", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
    </div>
  );
}

export function TextFiles({ link, alignContent, message, color }) {
  return (
    <div
      style={{ display: "flex", justifyContent: alignContent }}
      className="TextFiles docs  msg"
    >
      <div>
        <div style={color}>
          <img src={txt} alt="txt-file" width={"100px"} />
          <a href={link} download>
            {message.originalName}
          </a>
        </div>
        <p>
          {new Date(message.timestamp).toLocaleTimeString("US-en", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
    </div>
  );
}

export function PDFFiles({ link, alignContent, message, color }) {
  return (
    <div
      style={{ display: "flex", justifyContent: alignContent }}
      className="PDFFiles docs  msg"
    >
      <div>
        <div style={color}>
          <img src={pdf} alt="pdf-file" width={"100px"} />
          <a href={link} download>
            {message.originalName}
          </a>
        </div>
        <p>
          {new Date(message.timestamp).toLocaleTimeString("US-en", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
    </div>
  );
}

export function Zip({ link, alignContent, message, color }) {
  return (
    <div
      style={{ display: "flex", justifyContent: alignContent }}
      className="Zip docs  msg"
    >
      <div>
        <div style={color}>
          <img src={zip} alt="zip-file" width={"100px"} />
          <a href={link} download>
            {message.originalName}
          </a>
        </div>
        <p>
          {new Date(message.timestamp).toLocaleTimeString("US-en", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
    </div>
  );
}

export function DocFiles({ link, alignContent, message, color }) {
  return (
    <div
      style={{ display: "flex", justifyContent: alignContent }}
      className="DocFiles docs  msg"
    >
      <div>
        <div style={color}>
          <img src={doc} alt="zip-file" width={"100px"} />
          <a href={link} download>
            {message.originalName}
          </a>
        </div>
        <p>
          {new Date(message.timestamp).toLocaleTimeString("US-en", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
    </div>
  );
}

export function AudioFiles({ src, alignContent, message, color }) {
  return (
    <div
      style={{ display: "flex", justifyContent: alignContent }}
      className="AudioFiles msg"
    >
      <audio controls style={{ border: color.backgroundColor }}>
        <source src={src} type="audio/mp3" />
      </audio>
    </div>
  );
}

export function VideoFiles({ src, alignContent, message, color }) {
  return (
    <div
      style={{ display: "flex", justifyContent: alignContent, color }}
      className="VideoFiles msg"
    >
      <div style={{ borderColor: color.backgroundColor }}>
        <video src={src} controls></video>
        <p>
          {new Date(message.timestamp).toLocaleTimeString("US-en", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        <a href={message.content} download>
          <DownloadRounded />
        </a>
      </div>
    </div>
  );
}

// export default function MessageTypes(type) {
//      switch(type){
//         case /png|jpg/i:
//           return <ImageFiles/>
//         case 'txt':
//           return <TextFiles/>
//         case 'zip':
//           return <Zip/>
//         case 'textMessage':
//           return <textMessage/>
//         case 'pdf':
//           return <PDFFiles/>
//      }
// }
