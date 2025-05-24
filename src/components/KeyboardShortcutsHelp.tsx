import { useState, useEffect } from "react";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";

const shortcuts = [
  { key: "⌘/Ctrl + K", description: "Open Command Palette" },
  { key: "⌘/Ctrl + H", description: "Go to Home" },
  { key: "⌘/Ctrl + S", description: "View Skills" },
  { key: "⌘/Ctrl + P", description: "View Projects" },
  { key: "⌘/Ctrl + A", description: "View About" },
  { key: "⌘/Ctrl + E", description: "View Contact" },
];

const KeyboardShortcutsHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <>
      <Fab
        size="small"
        aria-label="keyboard shortcuts"
        onClick={() => setIsOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: "#1E1E1E",
          border: "1px solid #333",
          "&:hover": {
            backgroundColor: "#2D2D2D",
            borderColor: "#00FF00",
          },
        }}
      >
        <KeyboardIcon sx={{ color: "#00FF00" }} />
      </Fab>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#1E1E1E",
            border: "1px solid #333",
            borderRadius: 1,
            minWidth: "320px",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#E6DB74",
            fontFamily: "Fira Code",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Keyboard Shortcuts
          <IconButton onClick={() => setIsOpen(false)} sx={{ color: "#666" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <AnimatePresence>
            {shortcuts.map((shortcut, index) => (
              <motion.div
                key={shortcut.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    sx={{ color: "#ABB2BF", fontFamily: "Roboto Mono" }}
                  >
                    {shortcut.description}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#00FF00",
                      fontFamily: "Fira Code",
                      backgroundColor: "#2D2D2D",
                      px: 1,
                      py: 0.5,
                      borderRadius: 0.5,
                      fontSize: "0.875rem",
                    }}
                  >
                    {shortcut.key}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KeyboardShortcutsHelp;
