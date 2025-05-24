import { useState } from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import CircleIcon from "@mui/icons-material/Circle";

interface Tab {
  id: string;
  title: string;
  command: string;
}

const tabs: Tab[] = [
  { id: "home", title: "home.sh", command: "~/portfolio" },
  { id: "skills", title: "skills.json", command: "cat skills.json" },
  { id: "projects", title: "projects.ts", command: "ls ./projects" },
  { id: "about", title: "about.md", command: "less about.md" },
  { id: "contact", title: "contact.sh", command: "./contact" },
];

interface TerminalTabsProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

const TerminalTabs = ({ activeTab, onTabChange }: TerminalTabsProps) => {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <Box
      sx={{
        backgroundColor: "#1E1E1E",
        borderBottom: "1px solid #333",
        position: "sticky",
        minWidth: "100vw",
        maxWidth: "100vw",
        top: 0,
        zIndex: 1100,
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        msOverflowStyle: "-ms-autohiding-scrollbar",
        "&::-webkit-scrollbar": {
          height: "2px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#333",
          borderRadius: "2px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          px: { xs: 0.5, sm: 1, md: 2 },
          py: { xs: 0.5, sm: 1 },
          minWidth: "100%",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            mr: { xs: 1, sm: 2 },
            display: { xs: "none", sm: "flex" },
          }}
        >
          <CircleIcon sx={{ color: "#FF5F56", fontSize: 12 }} />
          <CircleIcon sx={{ color: "#FFBD2E", fontSize: 12 }} />
          <CircleIcon sx={{ color: "#27C93F", fontSize: 12 }} />
        </Stack>

        <Stack
          direction="row"
          spacing={{ xs: 0.25, sm: 0.5 }}
          sx={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            flex: 1,
          }}
        >
          {tabs.map((tab) => (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setHoveredTab(tab.id)}
              onHoverEnd={() => setHoveredTab(null)}
              style={{ flex: "0 0 auto" }}
            >
              <Box
                onClick={() => onTabChange(tab.id)}
                sx={{
                  px: { xs: 1.5, sm: 2, md: 3 },
                  py: { xs: 0.75, sm: 1 },
                  cursor: "pointer",
                  backgroundColor:
                    activeTab === tab.id ? "#2D2D2D" : "transparent",
                  borderBottom:
                    activeTab === tab.id ? "2px solid #00FF00" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 0.5, sm: 1 },
                  minWidth: "max-content",
                  userSelect: "none",
                  WebkitTapHighlightColor: "transparent",
                  transition: "all 0.2s ease",
                  "&:active": {
                    backgroundColor: "#3D3D3D",
                    transform: "scale(0.98)",
                  },
                  touchAction: "manipulation",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: activeTab === tab.id ? "#00FF00" : "#666",
                    fontFamily: "Fira Code",
                    fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem" },
                    whiteSpace: "nowrap",
                    letterSpacing: { xs: "-0.02em", sm: "normal" },
                  }}
                >
                  {tab.title}
                </Typography>
                <AnimatePresence>
                  {(hoveredTab === tab.id || window.innerWidth < 600) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTabChange(tabs[0].id);
                        }}
                        sx={{
                          p: { xs: 0.3, sm: 0.2 },
                          minWidth: { xs: 24, sm: "auto" },
                          minHeight: { xs: 24, sm: "auto" },
                          display: { xs: "none", md: "inline-flex" },
                        }}
                      >
                        <CloseIcon
                          sx={{ fontSize: { xs: 12, sm: 14 }, color: "#666" }}
                        />
                      </IconButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </motion.div>
          ))}
        </Stack>
      </Box>
      <Box
        sx={{
          px: { xs: 0.5, sm: 1, md: 2 },
          py: { xs: 0.3, sm: 0.5 },
          backgroundColor: "#2D2D2D",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "#666",
            fontFamily: "Fira Code",
            fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.75rem" },
            whiteSpace: "nowrap",
            display: "block",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {tabs.find((t) => t.id === activeTab)?.command}
        </Typography>
      </Box>
    </Box>
  );
};

export default TerminalTabs;
