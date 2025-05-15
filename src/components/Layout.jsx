import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./SideBar";
import TopBar from "./TopBar";

const Layout = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      height="100vh"
      sx={{ overflow: "hidden" }}
    >
      <TopBar />
      <Box display="flex" flexGrow={1} sx={{ overflow: "hidden" }}>
        <Sidebar />
        <Box
          flexGrow={1}
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            width: "100%",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
