import { Button, Stack } from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

const RightBar = ({ onScroll, currentIndex, videoCount }) => {
  return (
    <Stack
      spacing={1}
      alignItems="center"
      justifyContent="center"
      height="100%"
      marginRight={5}
    >
      <Button
        onClick={() => onScroll(-1)}
        disabled={currentIndex <= 0}
        sx={{
          backgroundColor: "f1f1f2",
          minWidth: 0,
          borderRadius: "50%",
          width: 48,
          height: 48,
          "&:hover": { backgroundColor: "#bfbfbf" },
        }}
      >
        <KeyboardArrowUp
          sx={{
            fontSize: 40,
            color: currentIndex <= 0 ? "#999" : "#000",
          }}
        />
      </Button>

      <Button
        onClick={() => onScroll(1)}
        disabled={currentIndex >= videoCount - 1}
        sx={{
          backgroundColor: "f1f1f2",
          minWidth: 0,
          borderRadius: "50%",
          width: 48,
          height: 48,
          "&:hover": { backgroundColor: "#bfbfbf" },
        }}
      >
        <KeyboardArrowDown
          sx={{
            fontSize: 40,
            color: currentIndex === videoCount.length - 1 ? "#999" : "#000",
          }}
        />
      </Button>
    </Stack>
  );
};

export default RightBar;
