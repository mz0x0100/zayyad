import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import TerminalTabs from "../components/TerminalTabs";
import HeroSection from "../components/HeroSection";
import SkillsTerminal from "../components/SkillsTerminal";
import ProjectCard from "../components/ProjectCard";
import ContactForm from "../components/ContactForm";
import SocialLinks from "../components/SocialLinks";
import CommandPalette from "../components/CommandPalette";
import KeyboardShortcutsHelp from "../components/KeyboardShortcutsHelp";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";

const projects = [
  {
    title: "DeTork",
    description:
      "DeTork is the on-chain freelance marketplace for blockchain developers",
    techStack: [
      "Rust",
      "Web3",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Solana",
      "Anchor",
    ],
    githubUrl: "https://github.com/mz0x0100/DetorkSmartContracts",
    liveUrl: "https://detork.vercel.app",
    image: "/detork.png",
  },
  {
    title: "Coinlet",
    description:
      "Coinlet is a P2P trading platform for exchaning Pi cryptocurrency for Fiat on the Pi browser",
    techStack: ["React.js", "Pi Sdk", "Node.js", "MongoDB", "Express"],
    liveUrl: "https://coinlet.vercel.app",
    image: "/coinlet.png",
  },
  {
    title: "AGDetection",
    description:
      "Age and gender detection using real-time video stream analysis with TensorFlow and OpenCV",
    techStack: ["Python", "TensorFlow", "OpenCV"],
    githubUrl: "https://github.com/mz0x0100/AGDetection",
    image: "/elon.png",
  },
  {
    title: "Virtual painter using gestures",
    description:
      "A fun python project that allows users to draw on their screen using hand gestures captured by a webcam",
    techStack: ["Python", "TensorFlow", "OpenCV"],
    githubUrl: "https://github.com/mz0x0100/AGDetection",
    image: "/elon.png",
  },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const shortcuts = [
    {
      key: "k",
      metaKey: true,
      action: () => setIsCommandPaletteOpen(true),
    },
    {
      key: "h",
      metaKey: true,
      action: () => setActiveTab("home"),
    },
    {
      key: "s",
      metaKey: true,
      action: () => setActiveTab("skills"),
    },
    {
      key: "p",
      metaKey: true,
      action: () => setActiveTab("projects"),
    },
    {
      key: "a",
      metaKey: true,
      action: () => setActiveTab("about"),
    },
    {
      key: "e",
      metaKey: true,
      action: () => setActiveTab("contact"),
    },
  ];

  useKeyboardShortcuts(shortcuts);

  const commands = [
    {
      id: "home",
      title: "View Home",
      description: "Go to the home page",
      shortcut: "⌘/Ctrl + H",
      action: () => setActiveTab("home"),
    },
    {
      id: "skills",
      title: "View Skills",
      description: "Check out my technical skills",
      shortcut: "⌘/Ctrl + S",
      action: () => setActiveTab("skills"),
    },
    {
      id: "projects",
      title: "View Projects",
      description: "Browse my featured projects",
      shortcut: "⌘/Ctrl + P",
      action: () => setActiveTab("projects"),
    },
    {
      id: "about",
      title: "About Me",
      description: "Learn more about my background",
      shortcut: "⌘/Ctrl + A",
      action: () => setActiveTab("about"),
    },
    {
      id: "contact",
      title: "Contact",
      description: "Get in touch with me",
      shortcut: "⌘/Ctrl + E",
      action: () => setActiveTab("contact"),
    },
    {
      id: "github",
      title: "View GitHub Profile",
      description: "Check out my open source contributions",
      action: () => window.open("https://github.com/mz0x0100", "_blank"),
    },
    {
      id: "linkedin",
      title: "View LinkedIn Profile",
      description: "Connect with me professionally",
      action: () => window.open("https://linkedin.com/in/mz0x0100", "_blank"),
    },
  ];

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HeroSection />;
      case "skills":
        return (
          <Container
            maxWidth="lg"
            sx={{
              py: { xs: 2, md: 4 },
              px: { xs: 1, sm: 2, md: 3 },
            }}
          >
            <SkillsTerminal />
          </Container>
        );
      case "projects":
        return (
          <Container
            maxWidth="lg"
            sx={{
              py: { xs: 2, md: 4 },
              px: { xs: 1, sm: 2, md: 3 },
            }}
          >
            <Box
              sx={{
                display: "grid",
                gap: { xs: 2, md: 4 },
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(auto-fill, minmax(450px, 1fr))",
                },
              }}
            >
              {projects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </Box>
          </Container>
        );
      case "about":
        return (
          <Container
            maxWidth="lg"
            sx={{
              py: { xs: 2, md: 4 },
              px: { xs: 1, sm: 2, md: 3 },
            }}
          >
            <Box
              sx={{
                backgroundColor: "#1E1E1E",
                border: "1px solid #333",
                borderRadius: 1,
                p: { xs: 2, md: 3 },
                overflowX: "auto",
              }}
            >
              <pre
                style={{
                  color: "#ABB2BF",
                  fontFamily: "Fira Code",
                  whiteSpace: "pre-wrap",
                  margin: 0,
                  fontSize: "0.875rem",
                }}
              >
                {`# About Me

## Background
I'm a passionate software engineer with 5+ years of experience in full-stack development, AI/ML, and cybersecurity. My journey began with ethical hacking, but my curiosity led me to explore various domains of technology.

## Philosophy
I believe in writing clean, maintainable code and building solutions that make a real impact with security in mind. My approach combines technical expertise with creative problem-solving.

## Interests
- Building scalable distributed systems
- Exploring AI/ML applications
- Contributing to open-source projects
- Staying updated with cybersecurity trends

## Current Focus
Currently working on innovative projects involving AI, blockchain, and cybersecurity while continuously learning and growing as a developer.`}
              </pre>
            </Box>
          </Container>
        );
      case "contact":
        return (
          <Container
            maxWidth="lg"
            sx={{
              py: { xs: 2, md: 4 },
              px: { xs: 1, sm: 2, md: 3 },
            }}
          >
            <ContactForm />
            <Box sx={{ mt: 4 }}>
              <SocialLinks />
            </Box>
          </Container>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          minWidth: "100%",
          backgroundColor: "#121212",
        }}
      >
        <TerminalTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
        <CommandPalette
          commands={commands}
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
        />
        <KeyboardShortcutsHelp />
      </Box>
    </>
  );
};

export default Index;
