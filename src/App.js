import "./css/style.css";
import "./css/dashboard.css";
import React, { createContext, useState, useEffect, useRef } from "react";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  Button,
  Modal,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import WarningIcon from "@mui/icons-material/Warning";
import { Outlet } from "react-router-dom";
import SideBar from "./scenes/layout/sidebar";
import Navbar from "./scenes/layout/navbar";
import { ColorModeContext, useMode } from "./theme";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import documentMixedData from "./scenes/data/document_mixed.json";
import backgroundMusic from "./assets/music/xoxo.mp3";
import loa from "./assets/images/loa.png"

export const ToggledContext = createContext(null);

function App() {
  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false); // To track sound status
  const values = { toggled, setToggled };
  const audioRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const toggleSound = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      isMuted ? audioRef.current.play() : audioRef.current.pause();
    }
  };

  useEffect(() => {
    if (open && audioRef.current && !isMuted) {
      audioRef.current.play();
    }
  }, [open, isMuted]);

  useEffect(() => {
    toast.success("Đăng nhập thành công!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, []);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:19999");

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      setMessage(event.data);
      setOpen(true);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToggledContext.Provider value={values}>
          <Box sx={{ display: "flex", height: "100vh", maxWidth: "100%" }}>
            <SideBar />
            <Box
              sx={{
                overflowY: "auto",
                flex: 1,
                maxWidth: "100%",
                marginLeft: "3%",
                marginRight: "3%",
              }}
            >
              <Navbar />
              <Box sx={{ overflowY: "auto", flex: 1, maxWidth: "100%" }}>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="document-modal-title"
                  aria-describedby="document-modal-description"
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 400,
                      bgcolor: "background.paper",
                      boxShadow: 24,
                      p: 4,
                    }}
                  >
                    {/* Close button in red box */}
                    <IconButton
                      onClick={handleClose}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "red",
                        color: "white",
                        borderRadius: "50%",
                        "&:hover": {
                          bgcolor: "darkred",
                        },
                      }}
                    >
                      <CloseIcon />
                    </IconButton>

                    {/* Sound toggle icon */}
                    <IconButton
                      onClick={toggleSound}
                      sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        color: "darkgreen",
                      }}
                    >
                      {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                    </IconButton>

                    {/* Modal Title */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 2,
                        color: "red",
                        fontWeight: 500,
                        // border: "1px solid red",
                        p: 1,
                      }}
                    >
                      {/* <WarningIcon sx={{ color: "orange", mr: 1 }} /> */}
                      <Box
                        component="img"
                        src={loa} // Đường dẫn logo
                        alt="Loa"
                        width="20%"
                        height="20%"
                        mb={2}
                        mr={1}
                      />
                      <Typography
                        variant="h3"
                        component="h2"
                        sx={{ fontWeight: "bold" }}
                      >
                        THÔNG BÁO
                      </Typography>
                    </Box>

                    {/* Document Table */}
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Document Name</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {documentMixedData.map((doc, index) => (
                            <TableRow
                              key={index}
                              sx={{
                                bgcolor: doc.Status ? "inherit" : "lightyellow",
                              }}
                            >
                              <TableCell>{doc.DocumentName}</TableCell>
                              <TableCell>{doc.Status ? "✔️" : "❌"}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Modal>
                <Outlet />
                <audio ref={audioRef} src={backgroundMusic} hidden />
              </Box>
            </Box>
          </Box>
          <ToastContainer />
        </ToggledContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
