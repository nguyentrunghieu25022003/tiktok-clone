import {
  Avatar,
  Box,
  Button,
  Typography,
  Tabs,
  Tab,
  Grid,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const { authorId } = useParams();
  const [tab, setTab] = useState(0);
  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleTabChange = (_, newValue) => {
    setTab(newValue);
  };

  const fetchAuthor = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/author/detail/${authorId}`
      );
      if (response.status === 200) {
        setAuthor(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch author:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, [authorId]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3} mx="auto" width="100%" maxWidth="1100px">
      {author && (
        <Box display="flex" gap={3} mb={3} mt={10} alignItems="center">
          <Avatar
            src={author.profilePic?.find(Boolean) || ""}
            sx={{ width: 180, height: 180 }}
          />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {author.username}
            </Typography>
            <Typography color="textSecondary" fontSize={14}>
              {author.email}
            </Typography>
            <Box mt={1} display="flex" gap={1}>
              <Button
                variant="contained"
                size="medium"
                sx={{
                  color: "white",
                  backgroundColor: "#FE2C55",
                  "&:hover": { backgroundColor: "#d51f45" },
                }}
              >
                Follow
              </Button>
              <Button
                variant="outlined"
                size="medium"
                sx={{
                  color: "black",
                  border: "none",
                  backgroundColor: "#F1F1F2",
                }}
              >
                Message
              </Button>
            </Box>
            <Box display="flex" gap={2} mt={1}>
              <Typography fontSize={17} color="gray" fontWeight={600}>
                {author.followingsCount} Following
              </Typography>
              <Typography fontSize={17} color="gray" fontWeight={600}>
                {author.followersCount} Followers
              </Typography>
              <Typography fontSize={17} color="gray" fontWeight={600}>
                0 Likes
              </Typography>
            </Box>
            <Typography mt={1}>{author.bio}</Typography>
          </Box>
        </Box>
      )}

      <Tabs
        value={tab}
        onChange={handleTabChange}
        textColor="inherit"
        TabIndicatorProps={{ style: { backgroundColor: "#FE2C55" } }}
      >
        <Tab label="VIDEOS" />
        <Tab label="REPOSTS" />
        <Tab label="LIKES" />
      </Tabs>

      <Grid container spacing={2} mt={2}>
        {tab === 0 &&
          author?.videos?.map((video) => (
            <Grid item xs={6} sm={4} md={3} key={video.id} minHeight="40vh">
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  borderRadius: 2,
                  cursor: "pointer",
                  aspectRatio: "9/16",
                  overflow: "hidden",
                }}
              >
                <Box
                  component="video"
                  src={video.videoUrl}
                  muted
                  loop
                  playsInline
                  sx={{
                    width: "180px",
                    height: "100%",
                    objectFit: "cover",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => {
                    e.target.pause();
                    e.target.currentTime = 0;
                  }}
                />

                <Box
                  position="absolute"
                  bottom={8}
                  left={8}
                  display="flex"
                  alignItems="center"
                  px={1}
                  py={0.5}
                  borderRadius={1}
                >
                  <VisibilityIcon
                    sx={{ fontSize: 16, color: "white", mr: 0.5 }}
                  />
                  <Typography fontSize={13} color="white" fontWeight={500} mt={0.5}>
                    {video.viewCount}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        {tab !== 0 && (
          <Grid item xs={12} minHeight="40vh">
            <Typography color="gray" mt={2}>
              No data for this tab yet.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default Profile;
