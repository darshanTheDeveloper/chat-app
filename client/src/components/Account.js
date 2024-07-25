import React, { useRef, useState } from "react";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { storage } from "../Config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  Typography,
  styled,
  CircularProgress,
  TextField,
  Switch,
  Tooltip,
  IconButton,
} from "@mui/material";
import { useUser } from "./context/UserContext";
import SaveIcon from "@mui/icons-material/Save";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Account() {
  const [open, setOpen] = useState(false);
  const { currentUser, setCurrentUser } = useUser();
  const [progress, setProgress] = useState(0);
  const imgRef = useRef();
  const [profilePic, setProfilePic] = useState(currentUser.img);
  const [user, setUser] = useState(currentUser);
  const [readOnly, setReadOnly] = useState(true);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    console.log(profilePic);
  };

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `profile_pictures/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress === 100) {
            setProgress(0);
          } else {
            setProgress(progress);
          }
        },
        (error) => {
          console.log(error);
        }
      );

      try {
        // Use the uploadTask.then to wait until the upload is completed
        await uploadTask.then();
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        const response = await fetch("/api/update-profile-pic", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: currentUser.username,
            profilePic: downloadURL,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update profile picture");
        }
        const data = await response.json();
        setCurrentUser(data);
        setProfilePic(downloadURL);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function edit() {
    try {
      const response = await fetch("/api/edit-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile picture");
      }
      const data = await response.json();
      setCurrentUser(data);
      setReadOnly(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Tooltip
        title={`${currentUser.firstName} ${currentUser.lastName}`}
        arrow
        color=""
      >
        <IconButton onClick={toggleDrawer(true)}>
          <AccountCircleRoundedIcon sx={{ color: "black" }} />
        </IconButton>
      </Tooltip>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Tooltip title={"Edit Profit"} arrow>
          <Switch
            checked={readOnly}
            inputProps={{ "aria-label": "controlled" }}
            onChange={(e) => {
              setReadOnly(e.target.checked);
            }}
            sx={{ marginLeft: "auto" }}
          />
        </Tooltip>
        <Box
          height={"100vh"}
          width={"700px"}
          my={4}
          display="flex"
          alignItems="center"
          flexDirection="column"
          gap={4}
          p={2}
        >
          <Typography variant="h4" component="strong">
            PROFILE
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "1em",
            }}
          >
            <Box
              width={"200px"}
              height={"200px"}
              borderRadius={"50%"}
              border={"5px solid blueviolet"}
              overflow={"hidden"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              {!(progress > 0 && progress <= 100) ? (
                <img
                  src={profilePic}
                  alt=""
                  style={{
                    width: "100%",
                    aspectRatio: 1,
                    objectPosition: "center",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <CircularProgress
                  size={68}
                  variant="determinate"
                  value={progress}
                />
              )}
            </Box>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                ref={imgRef}
                type="file"
                accept="image/*"
                onChange={handleUpload}
              />
            </Button>
          </Box>
          <List>
            <ListItem>
              <TextField
                id="outlined-read-only-input"
                label="First Name"
                value={user.firstName}
                variant="filled"
                onChange={(e) => {
                  setUser((prev) => ({ ...prev, firstName: e.target.value }));
                }}
                defaultValue={currentUser.firstName}
                InputProps={{
                  readOnly: readOnly,
                }}
              />
            </ListItem>
            <ListItem>
              <TextField
                id="outlined-read-only-input"
                label="Last Name"
                value={user.lastName}
                variant="filled"
                onChange={(e) => {
                  setUser((prev) => ({ ...prev, lastName: e.target.value }));
                }}
                defaultValue={currentUser.lastName}
                InputProps={{
                  readOnly: readOnly,
                }}
              />
            </ListItem>
            <ListItem>
              <TextField
                id="outlined-read-only-input"
                label="Email"
                value={user.email}
                variant="filled"
                onChange={(e) => {
                  setUser((prev) => ({ ...prev, email: e.target.value }));
                }}
                defaultValue={currentUser.email}
                InputProps={{
                  readOnly: readOnly,
                }}
              />
            </ListItem>
            <ListItem>
              <TextField
                id="outlined-read-only-input"
                label="Username"
                value={user.username}
                variant="filled"
                onChange={(e) => {
                  setUser((prev) => ({ ...prev, username: e.target.value }));
                }}
                defaultValue={currentUser.username}
                InputProps={{
                  readOnly: readOnly,
                }}
              />
            </ListItem>
          </List>
          <Button onClick={edit} startIcon={<SaveIcon />} variant="contained">
            Save
          </Button>
        </Box>
      </Drawer>
    </div>
  );
}
