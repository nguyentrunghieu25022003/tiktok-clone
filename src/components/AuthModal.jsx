import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";

const AuthModal = ({ open, onClose, mode, onSwitchMode }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const endpoint = mode === "login" ? "auth/login" : "auth/register";
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/${endpoint}`, formData, {
        withCredentials: true,
      });

      if (response.status !== 201) {
        throw new Error(response.message || "Something went wrong");
      }

      if (mode === "login") {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      alert(`${mode === "login" ? "Logged in" : "Registered"} successfully!`);
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#fff",
          borderRadius: 3,
          px: 3,
          py: 2,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: 24,
          mb: 1,
          color: "#000",
        }}
      >
        {mode === "login" ? "Sign in to TikTok" : "Sign up for TikTok"}
      </DialogTitle>

      <DialogContent>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {mode === "register" && (
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              fullWidth
              value={formData.username}
              onChange={handleChange}
              InputProps={{
                style: { color: "#000" },
              }}
              InputLabelProps={{
                style: { color: "#000" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#000",
                  },
                  "&:hover fieldset": {
                    borderColor: "#000",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#000",
                  },
                },
              }}
            />
          )}

          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              style: { color: "#000" },
            }}
            InputLabelProps={{
              style: { color: "#000" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#000",
                },
                "&:hover fieldset": {
                  borderColor: "#000",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#000",
                },
              },
            }}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              style: { color: "#000" },
            }}
            InputLabelProps={{
              style: { color: "#000" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#000",
                },
                "&:hover fieldset": {
                  borderColor: "#000",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#000",
                },
              },
            }}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              mt: 1,
              borderRadius: "30px",
              fontWeight: "bold",
              py: 1.3,
              bgcolor: "#fe2c55",
              color: "#fff",
              "&:hover": {
                bgcolor: "#e0274b",
              },
            }}
          >
            {mode === "login" ? "Login" : "Register"}
          </Button>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 1, color: "#333" }}
          >
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <Box
                  component="span"
                  onClick={onSwitchMode}
                  sx={{
                    color: "#fe2c55",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  Register
                </Box>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Box
                  component="span"
                  onClick={onSwitchMode}
                  sx={{
                    color: "#fe2c55",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  Login
                </Box>
              </>
            )}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
