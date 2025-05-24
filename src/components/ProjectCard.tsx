import { Box, Typography, Link, Chip, Stack } from "@mui/material";
import { motion } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";

interface ProjectProps {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

const ProjectCard = ({
  title,
  description,
  techStack,
  githubUrl,
  liveUrl,
  image,
}: ProjectProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          backgroundColor: "#1E1E1E",
          border: "1px solid #333",
          borderRadius: 1,
          p: { xs: 2, md: 3 },
          mb: 3,
          "&:hover": {
            borderColor: "#00FF00",
            boxShadow: "0 0 10px rgba(0,255,0,0.1)",
          },
        }}
      >
        <Typography
          variant="h6"
          color="primary"
          sx={{
            fontFamily: "Fira Code",
            fontSize: { xs: "1rem", md: "1.25rem" },
            wordBreak: "break-word",
          }}
        >
          $ cat {title}.md
        </Typography>

        {image && (
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{
              width: "100%",
              height: { xs: "150px", sm: "200px" },
              objectFit: "cover",
              mt: 2,
              mb: 2,
              borderRadius: 1,
              border: "1px solid #333",
            }}
          />
        )}

        <Typography
          variant="body1"
          sx={{
            mt: 2,
            color: "#E6DB74",
            fontSize: { xs: "0.875rem", md: "1rem" },
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            mt: 2,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {techStack.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                backgroundColor: "#2E2E2E",
                color: "#00FF00",
                borderRadius: 0,
                fontSize: { xs: "0.75rem", md: "0.875rem" },
                height: { xs: "24px", md: "32px" },
                "&:hover": {
                  backgroundColor: "#3E3E3E",
                },
              }}
            />
          ))}
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2 }}
          sx={{ mt: 2 }}
        >
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener"
              sx={{
                color: "#00FF00",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                textDecoration: "none",
                p: { xs: 1, md: 0 },
                "&:hover": {
                  color: "#FFFFFF",
                  backgroundColor: {
                    xs: "rgba(0,255,0,0.1)",
                    md: "transparent",
                  },
                },
              }}
            >
              <GitHubIcon fontSize="small" />
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
              >
                View Source
              </Typography>
            </Link>
          )}
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener"
              sx={{
                color: "#00FF00",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                textDecoration: "none",
                p: { xs: 1, md: 0 },
                "&:hover": {
                  color: "#FFFFFF",
                  backgroundColor: {
                    xs: "rgba(0,255,0,0.1)",
                    md: "transparent",
                  },
                },
              }}
            >
              <LaunchIcon fontSize="small" />
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
              >
                Live Demo
              </Typography>
            </Link>
          )}
        </Stack>
      </Box>
    </motion.div>
  );
};

export default ProjectCard;
