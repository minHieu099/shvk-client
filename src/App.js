import './css/style.css';
import './css/dashboard.css';
import React, { createContext, useState, useEffect } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "./scenes/layout/sidebar";
import Navbar from "./scenes/layout/navbar";
import { ColorModeContext, useMode } from "./theme";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToggledContext = createContext(null);

function App() {
  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);
  const values = { toggled, setToggled };

  // Hiển thị thông báo khi đăng nhập thành công
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
  }, []); // useEffect với dependency rỗng sẽ chỉ chạy một lần khi component này render

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
                marginLeft: '3%',
                marginRight: '3%',
              }}
            >
              <Navbar />
              <Box sx={{ overflowY: "auto", flex: 1, maxWidth: "100%" }}>
                <Outlet />
              </Box>
            </Box>
          </Box>
          <ToastContainer /> {/* Đặt ToastContainer ở đây để quản lý tất cả các thông báo */}
        </ToggledContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
