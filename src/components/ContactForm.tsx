import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1000);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#1E1E1E",
        border: "1px solid #333",
        borderRadius: 1,
        p: { xs: 2, md: 3 },
        minWidth: "100%",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "#00FF00",
          fontFamily: "Fira Code",
          mb: 3,
          fontSize: { xs: "1.25rem", md: "1.5rem" },
        }}
      >
        $ send-message
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, md: 3 },
          }}
        >
          <TextField
            required
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: "#666" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#ABB2BF",
                fontSize: { xs: "0.875rem", md: "1rem" },
                "& fieldset": {
                  borderColor: "#333",
                },
                "&:hover fieldset": {
                  borderColor: "#666",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00FF00",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#666",
                "&.Mui-focused": {
                  color: "#00FF00",
                },
              },
            }}
          />

          <TextField
            required
            type="email"
            label="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#666" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#ABB2BF",
                fontSize: { xs: "0.875rem", md: "1rem" },
                "& fieldset": {
                  borderColor: "#333",
                },
                "&:hover fieldset": {
                  borderColor: "#666",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00FF00",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#666",
                "&.Mui-focused": {
                  color: "#00FF00",
                },
              },
            }}
          />

          <TextField
            required
            multiline
            rows={4}
            label="Message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MessageIcon
                    sx={{ color: "#666", alignSelf: "flex-start", mt: 1 }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#ABB2BF",
                fontSize: { xs: "0.875rem", md: "1rem" },
                "& fieldset": {
                  borderColor: "#333",
                },
                "&:hover fieldset": {
                  borderColor: "#666",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00FF00",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#666",
                "&.Mui-focused": {
                  color: "#00FF00",
                },
              },
            }}
          />

          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              variant="outlined"
              fullWidth
              sx={{
                color: "#00FF00",
                borderColor: "#00FF00",
                fontFamily: "Fira Code",
                height: { xs: "40px", md: "48px" },
                textTransform: "none",
                fontSize: { xs: "0.875rem", md: "1rem" },
                "&:hover": {
                  borderColor: "#00FF00",
                  backgroundColor: "rgba(0,255,0,0.1)",
                },
                "&:active": {
                  backgroundColor: "rgba(0,255,0,0.2)",
                },
              }}
            >
              Send Message
            </Button>
          </motion.div>
        </Box>
      </form>

      <AnimatePresence>
        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert
              severity={submitStatus}
              sx={{
                mt: 2,
                backgroundColor:
                  submitStatus === "success"
                    ? "rgba(0,255,0,0.1)"
                    : "rgba(255,0,0,0.1)",
                color: submitStatus === "success" ? "#00FF00" : "#FF0000",
                border: `1px solid ${
                  submitStatus === "success" ? "#00FF00" : "#FF0000"
                }`,
                "& .MuiAlert-icon": {
                  color: submitStatus === "success" ? "#00FF00" : "#FF0000",
                },
              }}
            >
              {submitStatus === "success"
                ? "Message sent successfully!"
                : "Failed to send message. Please try again."}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default ContactForm;
