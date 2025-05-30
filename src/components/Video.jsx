import { useEffect, useRef, useState } from "react";
import { Slider, Typography, Box } from "@mui/material";

const AutoPlayVideo = ({ url, muted, isActive, videoId }) => {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      video
        .play()
        .catch((err) => console.error(`Error playing video ${videoId}:`, err));
      setIsPaused(false);
    } else {
      video.pause();
      video.currentTime = 0;
      setIsPaused(true);
    }
  }, [isActive, videoId]);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  const handleSeek = (_, value) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (value / 100) * video.duration;
    video.currentTime = newTime;
    setProgress(value);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      bgcolor="black"
      overflow="hidden"
      onClick={handleTogglePlay}
      sx={{ cursor: "pointer", borderRadius: "20px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {url ? (
        <>
          <video
            ref={videoRef}
            src={url}
            muted={muted}
            width="100%"
            height="100%"
            loop
            playsInline
            preload="auto"
            style={{ objectFit: "cover" }}
          />
          {isHovered && (
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              zIndex={10}
              bgcolor="transparent"
            >
              <Box maxWidth="100%" mx="auto" px={1}>
                <Slider
                  value={progress}
                  onChange={handleSeek}
                  sx={{
                    color: "#ffffff",
                    height: 4,
                    padding: 0,
                    margin: 0,
                    "& .MuiSlider-thumb": { width: 10, height: 10 },
                  }}
                />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  color="#ffffff"
                  fontSize={12}
                  mt={1/2}
                  mb={1}
                >
                  <Typography variant="caption">
                    {formatTime(currentTime)}
                  </Typography>
                  <Typography variant="caption">
                    {formatTime(duration)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </>
      ) : (
        <Box
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          Video not available
        </Box>
      )}
    </Box>
  );
};

export default AutoPlayVideo;