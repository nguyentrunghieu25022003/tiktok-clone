import { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Favorite,
  ChatBubble,
  Bookmark,
  Share,
  VolumeUp,
  VolumeOff,
} from "@mui/icons-material";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import RightBar from "../components/RightBar";
import AutoPlayVideo from "../components/Video";
import CommentBox from "../components/CommentBox";
import { debounce } from "../utils/debounce";
import { useVideoScroller } from "../hooks/UseVideoScroller";
import { Link } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [error, setError] = useState(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const pageRef = useRef(1);
  const sentinelRef = useRef(null);

  const { assignRef, scrollToVideo } = useVideoScroller(videos, (index) => {
    setActiveVideoIndex(index);
    setActiveVideoId(videos[index]?.id);
  });
  const toggleMute = () => setIsMuted((m) => !m);

  const fetchVideos = useCallback(async () => {
    if (isFetching || !hasMore) return;
    if (!import.meta.env.VITE_API_URL) {
      setError("API URL is not configured. Please check .env file.");
      setIsFetching(false);
      return;
    }

    setIsFetching(true);
    setError(null);

    const maxRetries = 3;
    let attempt = 1;

    while (attempt <= maxRetries) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/video`,
          {
            params: { page: pageRef.current, limit: 20 },
            timeout: 30000,
          }
        );

        const newBatch = response.data.filter(
          (v) =>
            v.videoUrl?.startsWith("https://") && !v.videoUrl.includes("v3")
        );

        if (newBatch.length === 0) {
          setHasMore(false);
        } else {
          setVideos((prev) => {
            const prevIds = new Set(prev.map((x) => x.id));
            const uniques = newBatch.filter((x) => !prevIds.has(x.id));
            return [...prev, ...uniques];
          });
          pageRef.current += 1;
        }
        break;
      } catch (err) {
        console.error(`Fetch videos error (attempt ${attempt}):`, {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });

        if (attempt === maxRetries) {
          if (err.code === "ECONNABORTED") {
            setError("Request timed out. Please try again later.");
          } else if (err.response?.status === 429) {
            setError("Too many requests. Please wait a moment and try again.");
          } else if (err.response) {
            setError(
              `API error: ${err.response.status} - ${
                err.response.data?.message || "Unknown error"
              }`
            );
          } else {
            setError(
              "Failed to connect to the server. Please check your network."
            );
          }
        }
        attempt += 1;
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }

    setIsFetching(false);
  }, [isFetching, hasMore]);

  const debouncedFetchVideos = useCallback(debounce(fetchVideos, 500), [
    fetchVideos,
  ]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          debouncedFetchVideos();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 300px 0px",
        threshold: 0,
      }
    );
    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [debouncedFetchVideos, hasMore]);

  if (videos.length === 0 && isFetching) {
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
    <Box
      height="100vh"
      overflow="auto"
      sx={{
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {error && (
        <Box p={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {videos.map((video, index) => {
        const isActive = activeVideoId === video.id;
        return (
          <Box
            ref={assignRef(index)}
            key={video.id}
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ scrollSnapAlign: "start", position: "relative" }}
          >
            <Box width={360} height="83%" position="relative">
              {video.videoUrl ? (
                <AutoPlayVideo
                  url={video.videoUrl}
                  muted={isMuted}
                  isActive={activeVideoId === video.id}
                  videoId={video.id}
                />
              ) : (
                <Typography color="white">Video unavailable</Typography>
              )}

              <Box
                position="absolute"
                bottom={120}
                left={16}
                right={16}
                zIndex={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  maxWidth: "calc(100% - 32px)",
                  overflow: "hidden",
                }}
              >
                <Typography noWrap fontWeight="bold" color="white">
                  {video.author.username}
                </Typography>
                <Typography color="white" fontSize={12} whiteSpace="pre-line">
                  {video.description}
                </Typography>
                <Typography color="#f1f1f1" fontSize={12}>
                  {video.hashtags.map((h) => `#${h.hashtag.name}`).join(" ")}
                </Typography>
              </Box>

              <Box
                position="absolute"
                top={10}
                left={10}
                sx={{
                  bgcolor: "rgba(0,0,0,0.5)",
                  borderRadius: "50%",
                  width: 35,
                  height: 35,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeOff sx={{ color: "white" }} />
                ) : (
                  <VolumeUp sx={{ color: "white" }} />
                )}
              </Box>
            </Box>

            <Stack spacing={2} alignItems="center" ml={2} mt={20}>
              <Box
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Link to={`/profile/${video.authorId}`}>
                  <Avatar
                    src={video.author.profilePic?.find(Boolean) || ""}
                    sx={{ width: 50, height: 50 }}
                  />
                </Link>
                <Box
                  position="absolute"
                  bottom={-9}
                  bgcolor="red"
                  borderRadius="50%"
                  width={25}
                  height={25}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography color="white" fontWeight="bold">
                    +
                  </Typography>
                </Box>
              </Box>
              {[Favorite, ChatBubble, Bookmark, Share].map((Icon, i) => (
                <Box
                  key={i}
                  textAlign="center"
                  display="flex"
                  flexDirection="column"
                >
                  <Box
                    sx={{
                      borderRadius: "50%",
                      border: "1px solid rgba(255,255,255,0.5)",
                      bgcolor: "rgba(22,24,35,0.06)",
                      p: 1,
                      width: 36,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: i === 1 ? "pointer" : "default",
                    }}
                    onClick={i === 1 ? () => setIsCommentOpen(true) : undefined}
                  >
                    <Icon />
                  </Box>
                  <Typography variant="caption" fontSize={17}>
                    {i === 0
                      ? video.likeCount
                      : i === 1
                      ? video.commentCount
                      : i === 2
                      ? 0
                      : video.shareCount}
                  </Typography>
                </Box>
              ))}

              <Box>
                <Avatar
                  src={video.music.thumbnail}
                  sx={{
                    width: 50,
                    height: 50,
                    animation: "spin 4s linear infinite",
                    "@keyframes spin": {
                      from: { transform: "rotate(0deg)" },
                      to: { transform: "rotate(360deg)" },
                    },
                  }}
                />
              </Box>
            </Stack>
            <AnimatePresence>
              {isActive && isCommentOpen && (
                <CommentBox onClose={() => setIsCommentOpen(false)} videoId={video.videoId} />
              )}
            </AnimatePresence>
          </Box>
        );
      })}
      <Box
        position="fixed"
        right={10}
        top="50%"
        zIndex={99}
        sx={{ transform: "translateY(-50%)" }}
      >
        <RightBar
          onScroll={(dir) => {
            const newIndex = activeVideoIndex + dir;
            if (newIndex >= 0 && newIndex < videos.length) {
              setIsCommentOpen(false);
              scrollToVideo(newIndex);
            }
          }}
          currentIndex={activeVideoIndex}
          videoCount={videos.length}
        />
      </Box>

      {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}

      {isFetching && (
        <Box display="flex" justifyContent="center" py={2}>
          <CircularProgress sx={{ color: "white" }} />
        </Box>
      )}
    </Box>
  );
};

export default Home;
