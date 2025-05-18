"use client";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import GitHubIcon from "@mui/icons-material/GitHub";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Container, Paper } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";

import { downloadJson } from "@/lib/download";
import { fetchProjectV2All } from "@/lib/githubApi";

export default function Home() {
  const [token, setToken] = useState("");
  const [org, setOrg] = useState("");
  const [projectNumber, setProjectNumber] = useState("");
  const [status, setStatus] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }, [token]);

  const handleBackup = useCallback(async () => {
    setStatus("Backing up...");
    try {
      const result = await fetchProjectV2All(token, org, Number(projectNumber));
      downloadJson(result, `${org}-project${projectNumber}-backup.json`);
      setStatus("Backup complete (Downloaded)");
    } catch (e) {
      setStatus("Error: " + (e instanceof Error ? e.message : ""));
    }
  }, [token, org, projectNumber]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ p: 5, borderRadius: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <GitHubIcon sx={{ fontSize: 40, mr: 1 }} />
          <Typography variant="h4" component="h1">
            GitHub ProjectV2 Backup
          </Typography>
        </Box>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Box>
            <TextField
              label="GitHub Access Token"
              type={showToken ? "text" : "password"}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              fullWidth
              autoComplete="off"
              variant="outlined"
              sx={{ borderRadius: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showToken ? "Hide" : "Show"}
                      onClick={() => setShowToken((v) => !v)}
                      edge="end"
                      size="small"
                    >
                      {showToken ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    <IconButton
                      aria-label="Copy"
                      onClick={handleCopy}
                      edge="end"
                      size="small"
                      disabled={!token}
                      sx={{ ml: 0.5 }}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText={
                <span>
                  <Link
                    href="https://github.com/settings/tokens"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                  >
                    Get a personal access token
                  </Link>
                  {copied && (
                    <span style={{ color: "#06b6d4", marginLeft: 8 }}>
                      Copied!
                    </span>
                  )}
                </span>
              }
            />
            <Typography variant="caption" sx={{ mt: 0.5, display: "block" }}>
              Required scopes: repo, project (read-only is OK)
            </Typography>
          </Box>
          <TextField
            label="Organization Name"
            type="text"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ borderRadius: 2 }}
          />
          <TextField
            label="Project Number"
            type="number"
            value={projectNumber}
            onChange={(e) => setProjectNumber(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ borderRadius: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleBackup}
            disabled={!token || !org || !projectNumber}
            sx={{ py: 1.5, fontWeight: 700, fontSize: "1.1rem" }}
          >
            Run Backup
          </Button>
          {status && (
            <Alert
              severity={
                status.startsWith("Error")
                  ? "error"
                  : status.includes("Complete") ||
                      status.includes("Done") ||
                      status.includes("Success")
                    ? "success"
                    : "info"
              }
              sx={{ borderRadius: 2 }}
            >
              {status}
            </Alert>
          )}
        </Box>
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            variant="outlined"
            href="/view"
            sx={{ fontWeight: 700, fontSize: "1rem", borderRadius: 2, mt: 2 }}
          >
            Issue Viewer
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
