import { useNavigate } from 'react-router-dom';
import {
    Box,
    IconButton,
    InputBase,
    useMediaQuery,
    useTheme,
    Typography,
    Button,
    Menu,
    MenuItem,
  } from "@mui/material";
  import { tokens, ColorModeContext } from "../../../theme";
  import { useContext, useState } from "react";
  import {
    DarkModeOutlined,
    LightModeOutlined,
    MenuOutlined,
    NotificationsOutlined,
    PersonOutlined,
    SearchOutlined,
    SettingsOutlined,
  } from "@mui/icons-material";
  import { ToggledContext } from "../../../App";
  import { UserContext } from "../../../UserContext";

  const Navbar = () => {
    const navigate = useNavigate(); // Add this line
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const { toggled, setToggled } = useContext(ToggledContext);
    const { user, setUser } = useContext(UserContext);
    const isMdDevices = useMediaQuery("(max-width:768px)");
    const isXsDevices = useMediaQuery("(max-width:466px)");
    const colors = tokens(theme.palette.mode);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = () => {
        setUser(null);
        setAnchorEl(null);
        navigate('/login'); // Redirect to login page
      };

    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton sx={{ display: `${isMdDevices ? "flex" : "none"}` }} onClick={() => setToggled(!toggled)}>
              <MenuOutlined />
            </IconButton>
            <Box display="flex" alignItems="center" bgcolor={colors.primary[400]} borderRadius="3px" sx={{ display: `${isXsDevices ? "none" : "flex"}` }}>
              <InputBase placeholder="Search" sx={{ ml: 2, flex: 1 }} />
              <IconButton type="button" sx={{ p: 1 }}>
                <SearchOutlined />
              </IconButton>
            </Box>
          </Box>
    
          <Box display="flex" alignItems="center">
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>
            <IconButton>
              <NotificationsOutlined />
            </IconButton>
            <IconButton>
              <SettingsOutlined />
            </IconButton>
            <IconButton onClick={handleMenuClick}>
              <PersonOutlined />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {user && (
                <>
                  <MenuItem onClick={handleMenuClose}>Profile: {user.username}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Box>
      );
  };
  
  export default Navbar;
