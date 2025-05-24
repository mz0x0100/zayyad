import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const skills = {
  languages: ["Python", "JavaScript", "Rust", "C++", "C", "Java"],
  frontend: [
    "React/Next.js",
    "TypeScript/JavaScript",
    "HTML5/CSS3",
    "Material-UI",
    "Tailwind CSS",
    "Redux/Context API",
  ],
  backend: [
    "Node.js/Express",
    "Python/Flask",
    "PostgreSQL/MongoDB",
    "RESTful APIs",
  ],
  ai: [
    "TensorFlow/PyTorch",
    "Scikit-learn",
    "Computer Vision/OpenCV",
    "Data Analysis",
  ],
};

const SkillsTerminal = () => {
  const [currentCategory, setCurrentCategory] =
    useState<keyof typeof skills>("frontend");
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const typeText = async (text: string) => {
    setIsTyping(true);
    setTypedText("");
    for (let i = 0; i <= text.length; i++) {
      setTypedText(text.slice(0, i));
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    setIsTyping(false);
  };

  useEffect(() => {
    const text = `ls ./${currentCategory}`;
    typeText(text);
  }, [currentCategory]);

  return (
    <Box
      sx={{
        backgroundColor: "#1E1E1E",
        border: "1px solid #333",
        borderRadius: { xs: 1, md: 2 },
        p: { xs: 2, md: 3 },
        width: "100%",
        maxWidth: "800px",
        mx: "auto",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: { xs: 1, md: 2 },
          mb: { xs: 2, md: 3 },
          flexWrap: "wrap",
        }}
      >
        {(Object.keys(skills) as Array<keyof typeof skills>).map((category) => (
          <motion.div
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Box
              onClick={() => setCurrentCategory(category)}
              sx={{
                px: { xs: 1.5, md: 2 },
                py: { xs: 0.75, md: 1 },
                backgroundColor:
                  currentCategory === category ? "#2D2D2D" : "transparent",
                border: "1px solid",
                borderColor: currentCategory === category ? "#00FF00" : "#333",
                borderRadius: 1,
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: "#00FF00",
                },
                userSelect: "none",
                touchAction: "manipulation",
              }}
            >
              <Typography
                sx={{
                  color: currentCategory === category ? "#00FF00" : "#ABB2BF",
                  fontFamily: "Fira Code",
                  fontSize: { xs: "0.875rem", md: "1rem" },
                  textTransform: "lowercase",
                }}
              >
                {category}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>

      <Box
        sx={{
          backgroundColor: "#2D2D2D",
          borderRadius: 1,
          p: { xs: 1.5, md: 2 },
        }}
      >
        <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
          <Typography
            component="span"
            sx={{
              color: "#F92672",
              fontFamily: "Fira Code",
              fontSize: { xs: "0.875rem", md: "1rem" },
              mr: 1,
            }}
          >
            $
          </Typography>
          <Typography
            component="span"
            sx={{
              color: "#00FF00",
              fontFamily: "Fira Code",
              fontSize: { xs: "0.875rem", md: "1rem" },
            }}
          >
            {typedText}
          </Typography>
          <Box
            component="span"
            sx={{
              display: "inline-block",
              width: "8px",
              height: "16px",
              backgroundColor: "#00FF00",
              ml: 1,
              animation: isTyping ? "none" : "blink 1s step-end infinite",
              "@keyframes blink": {
                "0%, 100%": {
                  opacity: 1,
                },
                "50%": {
                  opacity: 0,
                },
              },
            }}
          />
        </Box>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: { xs: 1.5, md: 2 },
              }}
            >
              {skills[currentCategory].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: index * 0.1 },
                  }}
                >
                  <Typography
                    sx={{
                      color: "#ABB2BF",
                      fontFamily: "Fira Code",
                      fontSize: { xs: "0.875rem", md: "1rem" },
                      display: "flex",
                      alignItems: "center",
                      "&::before": {
                        content: '"-"',
                        color: "#F92672",
                        mr: 1,
                      },
                    }}
                  >
                    {skill}
                  </Typography>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default SkillsTerminal;
