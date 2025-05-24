import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  TextField,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface Command {
  id: string;
  title: string;
  description: string;
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteProps {
  commands: Command[];
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette = ({ commands, isOpen, onClose }: CommandPaletteProps) => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCommands = commands.filter(
    (command) =>
      command.title.toLowerCase().includes(search.toLowerCase()) ||
      command.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
        break;
      case "Escape":
        onClose();
        break;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: "#1E1E1E",
          border: "1px solid #333",
          borderRadius: { xs: 0, sm: 1 },
          position: "fixed",
          top: { xs: 0, sm: "20%" },
          m: { xs: 0, sm: 2 },
          width: { xs: "100%", sm: "600px" },
          maxHeight: { xs: "100vh", sm: "400px" },
        },
      }}
    >
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <TextField
          inputRef={inputRef}
          fullWidth
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search commands..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#666" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              color: "#ABB2BF",
              backgroundColor: "#2D2D2D",
              fontSize: { xs: "0.875rem", sm: "1rem" },
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
          }}
        />

        <Box
          sx={{
            maxHeight: { xs: "calc(100vh - 150px)", sm: "300px" },
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#333",
              borderRadius: "4px",
            },
          }}
        >
          <AnimatePresence>
            {filteredCommands.map((command, index) => (
              <motion.div
                key={command.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
              >
                <Box
                  onClick={() => {
                    command.action();
                    onClose();
                  }}
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    cursor: "pointer",
                    borderRadius: 1,
                    backgroundColor:
                      selectedIndex === index ? "#2D2D2D" : "transparent",
                    border:
                      selectedIndex === index
                        ? "1px solid #444"
                        : "1px solid transparent",
                    "&:hover": {
                      backgroundColor: "#2D2D2D",
                      border: "1px solid #444",
                    },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "#E6DB74",
                        fontFamily: "Fira Code",
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                        mb: 0.5,
                      }}
                    >
                      {command.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#666",
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      }}
                    >
                      {command.description}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    {command.shortcut && (
                      <Typography
                        sx={{
                          color: "#00FF00",
                          fontFamily: "Fira Code",
                          fontSize: { xs: "0.75rem", sm: "0.875rem" },
                          display: { xs: "none", sm: "block" },
                        }}
                      >
                        {command.shortcut}
                      </Typography>
                    )}
                    <ArrowForwardIcon
                      sx={{
                        color: "#666",
                        fontSize: { xs: "1rem", sm: "1.25rem" },
                      }}
                    />
                  </Box>
                </Box>
              </motion.div>
            ))}

            {filteredCommands.length === 0 && (
              <Box
                sx={{
                  p: 3,
                  textAlign: "center",
                  color: "#666",
                  fontFamily: "Fira Code",
                }}
              >
                No commands found
              </Box>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CommandPalette;
