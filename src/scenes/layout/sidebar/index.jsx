import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { DashboardOutlined, MenuOutlined, PeopleAltOutlined, CalendarMonth, ManageAccounts, Handshake, Task, MeetingRoom } from "@mui/icons-material";
import avatar from "../../../assets/images/logo_t286.png";
import logo from "../../../assets/images/logo_t286.png";
import Item from "./item";
import { ToggledContext } from "../../../App";

// Import the audio file
// import backgroundMusic from "../../../assets/music/backgroundMusic.mp3";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Sidebar
      backgroundColor={colors.primary[400]}
      rootStyles={{
        border: 0,
        height: "100%",
      }}
      sx={{
        overflowY: "hidden", // Ẩn thanh
      }}
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="md"
    >
      {/* Background music audio */}
      {/* <audio controls src={backgroundMusic} autoPlay loop hidden /> */}
      <Menu
        menuItemStyles={{
          button: { ":hover": { background: "transparent" } },
        }}
      >
        <MenuItem
          rootStyles={{
            margin: "10px 0 20px 0",
            color: colors.gray[100],
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                sx={{ transition: ".3s ease" }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  textTransform="capitalize"
                  color="#2f78a2"
                  ml="35px"
                >
                  TRUNG TÂM 286
                </Typography>
              </Box>
            )}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>
      {!collapsed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            mb: "25px",
          }}
        >
          <Avatar
            alt="avatar"
            src={avatar}
            sx={{ width: "100px", height: "100px" }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="#1a435e"
              textTransform="uppercase"
            >
              Số Hóa Văn Kiện
            </Typography>
            <Typography
              variant="h6"
              fontWeight="500"
              color={colors.greenAccent[500]}
            >
              VP Fancy Admin
            </Typography>
          </Box>
        </Box>
      )}

      <Box mb={5} pl={collapsed ? undefined : "5%"}>
        <Menu
          menuItemStyles={{
            button: {
              "&.selected": {
                border: "2px solid #00008B", // Dark blue border
                color: "#FFFFFF", // White text
                backgroundColor: "transparent",
              },
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Dashboard"
            path="/dashboard"
            colors={colors}
            icon={<DashboardOutlined />}
          />
        </Menu>
        
        {/* Bold Labels */}
        <Typography
          variant="h6"
          color={colors.gray[300]}
          fontWeight="bold" // Bold for "Tham mưu"
          sx={{ m: "15px 0 5px 20px", fontSize: '16px' }}
        >
          {!collapsed ? "Tham mưu" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Quản lý cán bộ"
            path="/team"
            colors={colors}
            icon={<PeopleAltOutlined />}
          />
          <Item
            title="Quản lý lịch trực"
            path="/schedule-management"
            colors={colors}
            icon={<CalendarMonth />}
          />
          <Item
            title="Quản lý Tài khoản"
            path="/manageAccounts"
            colors={colors}
            icon={<ManageAccounts />}
          />
        </Menu>

        <Typography
          variant="h6"
          color={colors.gray[300]}
          fontWeight="bold" // Bold for "Trực nội vụ"
          sx={{ m: "15px 0 5px 20px", fontSize: '16px' }}
        >
          {!collapsed ? "Trực nội vụ" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Bàn giao kíp trực"
            path="/handoverTNV"
            colors={colors}
            icon={<Handshake />}
          />
          <Item
            title="Nhật ký trực ban"
            path="/diaryTNV"
            colors={colors}
            icon={<Task />}
          />
        </Menu>

        <Typography
          variant="h6"
          color={colors.gray[300]}
          fontWeight="bold" // Bold for "Trực ban tác chiến"
          sx={{ m: "15px 0 5px 20px", fontSize: '16px' }}
        >
          {!collapsed ? "Trực ban tác chiến" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Bàn giao kíp trực"
            path="/handover"
            colors={colors}
            icon={<Handshake />}
          />
          <Item
            title="Giao ban trực tuyến"
            path="/online-meeting"
            colors={colors}
            icon={<MeetingRoom />}
          />
        </Menu>

        <Typography
          variant="h6"
          color={colors.gray[300]}
          fontWeight="bold" // Bold for "Trực ban các cụm"
          sx={{ m: "15px 0 5px 20px", fontSize: '16px' }}
        >
          {!collapsed ? "Trực ban các cụm" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Bàn giao kíp trực"
            path="/handoverTBCm"
            colors={colors}
            icon={<Handshake />}
          />
          <Item
            title="Nhật ký trực ban"
            path="/diaryTBCm"
            colors={colors}
            icon={<Task />}
          />
        </Menu>
      </Box>
    </Sidebar>
  );
};

export default SideBar;
