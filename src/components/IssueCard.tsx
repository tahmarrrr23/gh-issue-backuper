"use client";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Avatar,
  Box,
  Chip,
  Collapse,
  Divider,
  Fade,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ReactMarkdown from "react-markdown";

import type { Comment, Issue, ProjectField } from "../lib/issueLoader";

export const IssueCard = ({
  issue,
  isOpen,
  onToggle,
}: {
  issue: Issue;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const t = useTheme();
  return (
    <Paper
      elevation={isOpen ? 16 : 4}
      sx={{
        borderRadius: 5,
        p: { xs: 2, sm: 3 },
        transition: "box-shadow 0.2s, border 0.2s, background 0.2s",
        border: isOpen
          ? `2.5px solid ${t.palette.primary.main}`
          : `1.5px solid ${t.palette.background.paper}`,
        boxShadow: isOpen ? 16 : 4,
        position: "relative",
        background: isOpen
          ? `linear-gradient(120deg, ${t.palette.background.paper} 80%, ${t.palette.secondary.main} 100%)`
          : t.palette.background.paper,
        cursor: "pointer",
        ":hover": {
          boxShadow: 16,
          borderColor: t.palette.primary.main,
          background: `linear-gradient(120deg, ${t.palette.background.paper} 80%, ${t.palette.secondary.main} 100%)`,
        },
      }}
      onClick={onToggle}
    >
      <Box display="flex" alignItems="center" mb={1}>
        <Tooltip title={isOpen ? "Close" : "Show details"} arrow>
          <IconButton
            size="small"
            sx={{
              mr: 1,
              color: t.palette.primary.main,
              transition: "transform 0.2s",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              bgcolor: t.palette.background.default,
              border: `1.5px solid ${t.palette.secondary.main}`,
            }}
          >
            {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Tooltip>
        <Typography
          variant="h6"
          fontWeight={800}
          color="#fff"
          mr={1}
          sx={{ flexShrink: 0, letterSpacing: 1 }}
        >
          #{issue.number}
        </Typography>
        <Tooltip title="Open in GitHub" arrow>
          <IconButton
            href={issue.url}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            sx={{
              color: t.palette.primary.main,
              ml: 0.5,
              bgcolor: t.palette.background.default,
              border: `1.5px solid ${t.palette.secondary.main}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <OpenInNewIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Typography
          variant="h6"
          fontWeight={800}
          color="primary.main"
          sx={{
            textDecoration: "none",
            ml: 1,
            flexGrow: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            letterSpacing: 0.5,
          }}
        >
          {issue.title}
        </Typography>
        <Chip
          label={issue.state}
          color={issue.state === "OPEN" ? "success" : "error"}
          size="small"
          sx={{
            ml: 1,
            fontWeight: 800,
            letterSpacing: 1,
            fontSize: 15,
            px: 1.5,
          }}
        />
      </Box>
      {Array.isArray(issue.projectFields) && issue.projectFields.length > 0 && (
        <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
          {(issue.projectFields as ProjectField[])
            .filter((f: ProjectField) => f.name !== "Title")
            .map((f: ProjectField, i: number) => (
              <Chip
                key={i}
                label={`${f.name}: ${f.value}`}
                size="small"
                color="info"
                sx={{
                  bgcolor: t.palette.secondary.main,
                  color: t.palette.primary.main,
                  fontWeight: 700,
                  fontSize: 14,
                  px: 1.5,
                  mb: 0.5,
                }}
              />
            ))}
        </Stack>
      )}
      <Collapse in={isOpen} timeout={300} unmountOnExit>
        <Fade in={isOpen} timeout={400}>
          <Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  mr: 1.5,
                  bgcolor: t.palette.primary.main,
                  color: t.palette.background.default,
                  fontWeight: 900,
                  fontSize: 20,
                  border: `2px solid ${t.palette.secondary.main}`,
                }}
              >
                {issue.author?.login?.[0]?.toUpperCase() ?? "?"}
              </Avatar>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={700}
              >
                Author:{" "}
                <b style={{ color: t.palette.text.primary }}>
                  {issue.author?.login ?? "Unknown"}
                </b>{" "}
                / Created: {new Date(issue.createdAt).toLocaleString()} /
                Updated: {new Date(issue.updatedAt).toLocaleString()}
              </Typography>
            </Box>
            {issue.labels?.nodes?.length > 0 && (
              <Box mb={1}>
                {(issue.labels.nodes as { name: string }[]).map(
                  (label: { name: string }) => (
                    <Chip
                      key={label.name}
                      label={label.name}
                      size="small"
                      sx={{
                        mr: 0.5,
                        bgcolor: t.palette.secondary.main,
                        color: t.palette.primary.main,
                        fontWeight: 700,
                        fontSize: 13,
                        px: 1.2,
                      }}
                    />
                  )
                )}
              </Box>
            )}
            <Box
              sx={{
                mb: 2,
                fontSize: 17,
                wordBreak: "break-word",
                background: t.palette.background.paper,
                borderRadius: 2,
                p: 2.5,
                color: t.palette.text.primary,
                boxShadow: "0 2px 16px #0a1929",
                border: `1.5px solid ${t.palette.secondary.main}`,
              }}
            >
              <ReactMarkdown>{issue.body}</ReactMarkdown>
            </Box>
            <Divider sx={{ my: 2, borderColor: t.palette.secondary.main }} />
            <Typography
              variant="subtitle1"
              fontWeight={800}
              mb={1}
              color="text.secondary"
              sx={{ letterSpacing: 0.5 }}
            >
              Comments
            </Typography>
            {Array.isArray(issue.comments?.nodes) &&
              issue.comments.nodes.length === 0 && (
                <Typography variant="body2" color="#607d8b" fontWeight={700}>
                  No comments
                </Typography>
              )}
            {Array.isArray(issue.comments?.nodes) &&
              (issue.comments.nodes as Comment[]).map((comment: Comment) => (
                <Paper
                  key={comment.id}
                  variant="outlined"
                  sx={{
                    p: 2,
                    mb: 1.5,
                    borderRadius: 2,
                    background: t.palette.background.paper,
                    borderColor: t.palette.secondary.main,
                    boxShadow: "0 1px 8px #0a1929",
                  }}
                >
                  <Box display="flex" alignItems="center" mb={0.5}>
                    <Avatar
                      sx={{
                        width: 28,
                        height: 28,
                        mr: 1,
                        bgcolor: t.palette.primary.main,
                        color: t.palette.background.default,
                        fontWeight: 900,
                        fontSize: 16,
                        border: `1.5px solid ${t.palette.secondary.main}`,
                      }}
                    >
                      {comment.author?.login?.[0]?.toUpperCase() ?? "?"}
                    </Avatar>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight={700}
                    >
                      <b style={{ color: t.palette.text.primary }}>
                        {comment.author?.login ?? "Unknown"}
                      </b>{" "}
                      / {new Date(comment.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      fontSize: 15.5,
                      wordBreak: "break-word",
                      color: t.palette.text.primary,
                    }}
                  >
                    <ReactMarkdown>{comment.body}</ReactMarkdown>
                  </Box>
                </Paper>
              ))}
          </Box>
        </Fade>
      </Collapse>
    </Paper>
  );
};
