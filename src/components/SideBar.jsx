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

const SideBar = () => {
  const menuItems = [
    {
      icon: <Home sx={{ color: "black", fontSize: "35px" }} />,
      label: "Đề xuất",
    },
    {
      icon: <Explore sx={{ color: "black", fontSize: "35px" }} />,
      label: "Khám phá",
    },
    {
      icon: <Person sx={{ color: "black", fontSize: "35px" }} />,
      label: "Đã follow",
    },
    {
      icon: <Upload sx={{ color: "black", fontSize: "35px" }} />,
      label: "Tải lên",
    },
    {
      icon: <LiveTv sx={{ color: "black", fontSize: "35px" }} />,
      label: "LIVE",
    },
    {
      icon: <Person sx={{ color: "black", fontSize: "35px" }} />,
      label: "Hồ sơ",
    },
    {
      icon: <MoreHoriz sx={{ color: "black", fontSize: "35px" }} />,
      label: "Thêm",
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
            padding: " 10px 12px 6px 12px",
            borderRadius: 6,
            mb: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Search sx={{ color: "black" }} />
          <InputBase
            placeholder="Tìm kiếm"
            fullWidth
            sx={{ ml: 2, color: "gray" }}
          />
        </Box>

        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} sx={{ px: 1 }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          fullWidth
          color="error"
          sx={{ mt: 2, background: "rgba(254, 44, 85, 1)" }}
        >
          Đăng nhập
        </Button>
      </Box>

      <hr style={{ border: '1px solid #E3E3E4', margin: '20px 0 10px 0' }} />

      <Box>
        <List>
          <ListItem button>
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: "bold", color: '#999' }}>Company</Typography>
              }
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: "bold", color: '#999' }}>Program</Typography>
              }
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: "bold", color: '#999' }}>
                  Terms and Policies
                </Typography>
              }
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary={<Typography sx={{ fontSize: "12px", color: '#999' }}>More</Typography>}
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary={
                <Typography sx={{ fontSize: "12px", color: '#999' }}>© 2025 TikTok</Typography>
              }
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default SideBar;
