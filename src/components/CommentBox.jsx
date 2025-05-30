import { Box, Typography, TextField, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const CommentBox = ({ onClose, videoId }) => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const scrollRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchComments = async (pageNum) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/comment/${videoId}?page=${pageNum}`
      );
      if (response.status === 200) {
        const newComments = response.data || [];
        setComments((prev) => [...prev, ...newComments]);
        if (newComments.length === 0) setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    setComments([]);
    setPage(1);
    setHasMore(true);
    fetchComments(1);
  }, [videoId]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (el && hasMore && el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchComments(nextPage);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "absolute",
        right: "calc(50% - 220px)",
        bottom: 69,
        width: "350px",
        height: "calc(100vh - 170px)",
        backgroundColor: "#fff",
        color: "black",
        zIndex: 30,
        padding: "16px",
        overflow: "auto",
        boxShadow: "-2px 0 10px rgba(0,0,0,0.2)",
        borderRadius: "8px 0 0 8px",
      }}
      ref={scrollRef}
      onScroll={handleScroll}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{comments.length} bình luận</Typography>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            color: "black",
            fontSize: 18,
            border: "none",
            cursor: "pointer",
          }}
        >
          ✖
        </button>
      </Box>

      <Box
        mt={2}
        display="flex"
        alignItems="center"
        bgcolor="#ffffff"
        borderRadius={2}
        px={1.5}
        py={1}
        boxShadow="0px 2px 6px rgba(0, 0, 0, 0.3)"
      >
        <TextField
          placeholder="Thêm bình luận..."
          variant="standard"
          InputProps={{
            disableUnderline: true,
            style: { color: "black", flex: 1 },
          }}
          fullWidth
        />
        <IconButton size="small">
          <AlternateEmailIcon sx={{ color: "gray" }} />
        </IconButton>
        <IconButton size="small">
          <EmojiEmotionsIcon sx={{ color: "gray" }} />
        </IconButton>
        <Typography
          sx={{ color: "#aaa", ml: 1, cursor: "pointer", fontSize: 14 }}
        >
          Đăng
        </Typography>
      </Box>

      <Box mt={3}>
        {comments.map((comment, index) => (
          <Box key={index} mb={2}>
            <Typography variant="body2" fontWeight="bold">
              {comment.userName || "Người dùng ẩn danh"}
            </Typography>
            <Typography variant="body2">{comment.content}</Typography>
          </Box>
        ))}
      </Box>
    </motion.div>
  );
};

export default CommentBox;
