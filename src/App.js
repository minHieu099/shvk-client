import './css/style.css';
import './css/dashboard.css';
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
  <Box sx={{ width: '18%' }}>  {/* Set sidebar width to 18% */}
    <SideBar />
  </Box>
  <Box
    sx={{
      overflowY: "auto",
      flex: 1,
      maxWidth: "82%",  // Remaining width for content
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
        </ToggledContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );

}

export default App;
