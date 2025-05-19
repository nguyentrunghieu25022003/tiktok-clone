import { Box, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useInView } from "../hooks/UseInView";

const LazyVideo = ({ video }) => {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        width: "100%",
        borderRadius: 2,
        cursor: "pointer",
        aspectRatio: "9/16",
        overflow: "hidden",
        bgcolor: "#000",
      }}
    >
      {inView && (
        <Box
          component="video"
          src={video.videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
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
      )}

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
        <VisibilityIcon sx={{ fontSize: 16, color: "white", mr: 0.5 }} />
        <Typography fontSize={13} color="white" fontWeight={500} mt={0.5}>
          {video.viewCount}
        </Typography>
      </Box>
    </Box>
  );
};

export default LazyVideo;
