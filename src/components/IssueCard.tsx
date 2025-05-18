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
import React from "react";
import ReactMarkdown from "react-markdown";

export interface ProjectField {
  name: string;
  value?: string;
}
export interface Comment {
  id: string;
  author: { login: string };
  body: string;
  createdAt: string;
}
export interface Issue {
  id: string;
  number: number;
  title: string;
  url: string;
  state: string;
  createdAt: string;
  updatedAt: string;
  author: { login: string };
  assignees: { nodes: { login: string }[] };
  labels: { nodes: { name: string }[] };
  body: string;
  comments: { nodes: Comment[] };
  projectFields?: ProjectField[];
}

interface IssueCardProps {
  issue: Issue;
  isOpen: boolean;
  onToggle: () => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({
  issue,
  isOpen,
  onToggle,
}) => (
  <Paper
    elevation={isOpen ? 16 : 4}
    sx={{
      borderRadius: 5,
      p: { xs: 2, sm: 3 },
      transition: "box-shadow 0.2s, border 0.2s, background 0.2s",
      border: isOpen ? "2.5px solid #90caf9" : "1.5px solid #232a36",
      boxShadow: isOpen ? 16 : 4,
      position: "relative",
      background: isOpen
        ? "linear-gradient(120deg, #232a36 80%, #263043 100%)"
        : "#232a36",
      cursor: "pointer",
      ":hover": {
        boxShadow: 16,
        borderColor: "#90caf9",
        background: "linear-gradient(120deg, #232a36 80%, #263043 100%)",
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
            color: "#90caf9",
            transition: "transform 0.2s",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            bgcolor: "#181c24",
            border: "1.5px solid #263043",
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
            color: "#90caf9",
            ml: 0.5,
            bgcolor: "#181c24",
            border: "1.5px solid #263043",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <OpenInNewIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Typography
        variant="h6"
        fontWeight={800}
        color="#90caf9"
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
          bgcolor: issue.state === "OPEN" ? "#388e3c" : "#c62828",
          color: "#fff",
          fontSize: 15,
          px: 1.5,
        }}
      />
    </Box>
    {issue.projectFields && issue.projectFields.length > 0 && (
      <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
        {issue.projectFields
          .filter((field) => field.name !== "Title")
          .map((field, idx) => (
            <Chip
              key={idx}
              label={`${field.name}: ${field.value}`}
              size="small"
              color="info"
              sx={{
                bgcolor: "#263043",
                color: "#90caf9",
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
                bgcolor: "#90caf9",
                color: "#181c24",
                fontWeight: 900,
                fontSize: 20,
                border: "2px solid #263043",
              }}
            >
              {issue.author?.login?.[0]?.toUpperCase() ?? "?"}
            </Avatar>
            <Typography variant="body2" color="#b0bec5" fontWeight={700}>
              Author:{" "}
              <b style={{ color: "#fff" }}>
                {issue.author?.login ?? "Unknown"}
              </b>{" "}
              / Created: {new Date(issue.createdAt).toLocaleString()} / Updated:{" "}
              {new Date(issue.updatedAt).toLocaleString()}
            </Typography>
          </Box>
          {issue.labels?.nodes?.length > 0 && (
            <Box mb={1}>
              {issue.labels.nodes.map((label) => (
                <Chip
                  key={label.name}
                  label={label.name}
                  size="small"
                  sx={{
                    mr: 0.5,
                    bgcolor: "#263043",
                    color: "#90caf9",
                    fontWeight: 700,
                    fontSize: 13,
                    px: 1.2,
                  }}
                />
              ))}
            </Box>
          )}
          <Box
            sx={{
              mb: 2,
              fontSize: 17,
              wordBreak: "break-word",
              background: "#232a36",
              borderRadius: 2,
              p: 2.5,
              color: "#e3f2fd",
              boxShadow: "0 2px 16px #0a1929",
              border: "1.5px solid #263043",
            }}
          >
            <ReactMarkdown>{issue.body}</ReactMarkdown>
          </Box>
          <Divider sx={{ my: 2, borderColor: "#263043" }} />
          <Typography
            variant="subtitle1"
            fontWeight={800}
            mb={1}
            color="#b0bec5"
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
          {Array.isArray(issue.comments?.nodes) ? (
            issue.comments.nodes.map((comment) => (
              <Paper
                key={comment.id}
                variant="outlined"
                sx={{
                  p: 2,
                  mb: 1.5,
                  borderRadius: 2,
                  background: "#232a36",
                  borderColor: "#263043",
                  boxShadow: "0 1px 8px #0a1929",
                }}
              >
                <Box display="flex" alignItems="center" mb={0.5}>
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      mr: 1,
                      bgcolor: "#90caf9",
                      color: "#181c24",
                      fontWeight: 900,
                      fontSize: 16,
                      border: "1.5px solid #263043",
                    }}
                  >
                    {comment.author?.login?.[0]?.toUpperCase() ?? "?"}
                  </Avatar>
                  <Typography variant="body2" color="#b0bec5" fontWeight={700}>
                    <b style={{ color: "#fff" }}>
                      {comment.author?.login ?? "Unknown"}
                    </b>{" "}
                    / {new Date(comment.createdAt).toLocaleString()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    fontSize: 15.5,
                    wordBreak: "break-word",
                    color: "#e3f2fd",
                  }}
                >
                  <ReactMarkdown>{comment.body}</ReactMarkdown>
                </Box>
              </Paper>
            ))
          ) : (
            <Typography variant="body2" color="#607d8b" fontWeight={700}>
              No comments
            </Typography>
          )}
        </Box>
      </Fade>
    </Collapse>
  </Paper>
);
