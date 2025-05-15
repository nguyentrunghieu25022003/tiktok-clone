import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputBase,
} from "@mui/material";
import {
  Search,
  Home,
  Explore,
  Person,
  Upload,
  LiveTv,
  MoreHoriz,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const SideBar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: <Home sx={{ fontSize: "35px" }} />, label: "For You", path: "/" },
    {
      icon: <Explore sx={{ fontSize: "35px" }} />,
      label: "Discover",
      path: "/discover",
    },
    {
      icon: <Person sx={{ fontSize: "35px" }} />,
      label: "Following",
      path: "/following",
    },
    {
      icon: <Upload sx={{ fontSize: "35px" }} />,
      label: "Upload",
      path: "/upload",
    },
    {
      icon: <LiveTv sx={{ fontSize: "35px" }} />,
      label: "LIVE",
      path: "/live",
    },
    {
      icon: <Person sx={{ fontSize: "35px" }} />,
      label: "Profile",
      path: "/profile",
    },
    {
      icon: <MoreHoriz sx={{ fontSize: "35px" }} />,
      label: "More",
      path: "/more",
    },
  ];

  return (
    <Box
      width={250}
      height="100vh"
      position="fixed"
      left={0}
      top={10}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      bgcolor="#fff"
      sx={{ padding: "10px" }}
    >
      <Box>
        <Typography variant="h6" fontWeight="bold" mb={2} px={2}>
          TikTok
        </Typography>

        <Box
          sx={{
            backgroundColor: "#f1f1f1",
            padding: "10px 12px 6px 12px",
            borderRadius: 6,
            mt: 5,
            mb: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Search sx={{ color: "black" }} />
          <InputBase
            placeholder="Search"
            fullWidth
            sx={{ ml: 2, color: "gray" }}
          />
        </Box>

        <List>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem
                button
                key={index}
                component="Link"
                to={item.path}
                sx={{
                  px: 1,
                  bgcolor: isActive ? "#fff5f5" : "transparent",
                  "& .MuiTypography-root": {
                    color: isActive ? "rgba(254, 44, 85, 1)" : "black",
                    fontWeight: isActive ? "bold" : "normal",
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: isActive ? "rgba(254, 44, 85, 1)" : "black" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={<Typography>{item.label}</Typography>} />
              </ListItem>
            );
          })}
        </List>

        <Button
          variant="contained"
          fullWidth
          color="error"
          sx={{ mt: 2, background: "rgba(254, 44, 85, 1)" }}
        >
          Log in
        </Button>
      </Box>

      <hr style={{ border: "1px solid #E3E3E4", margin: "10px 0 5px 0" }} />

      <Box sx={{ pb: 6 }}>
        <List dense disablePadding>
          {[
            "Company",
            "Program",
            "Terms and Policies",
            "More",
            "© 2025 TikTok",
          ].map((label, i) => (
            <ListItem button key={i} sx={{ px: 2, py: 0.5, minHeight: 20 }}>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: i >= 3 ? "12px" : "13px",
                      fontWeight: i < 3 ? "bold" : "normal",
                      color: "#999",
                      lineHeight: 0.9,
                    }}
                  >
                    {label}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SideBar;
