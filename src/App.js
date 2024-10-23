import React, { createContext, useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import SideBar from "./scenes/layout/sidebar";
import Navbar from "./scenes/layout/navbar";
import { ColorModeContext, useMode } from "./theme";
export const ToggledContext = createContext(null);
function App() {
  const [theme, colorMode] = useMode();
  const [toggled, setToggled] = useState(false);
  const values = { toggled, setToggled };
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
                marginLeft: '3%',   // Cách lề trái 3%
                marginRight: '3%',  // Cách lề phải 3%
              }}
            >
              <Navbar />
              <Box sx={{ overflowY: "auto", flex: 1, maxWidth: "100%" }}>
                <Outlet />
              </Box>
            </Box>
          </Box>
        </ToggledContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );

}

export default App;
