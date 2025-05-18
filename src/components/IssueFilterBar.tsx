"use client";

import { Box, Button, Chip, Stack } from "@mui/material";
import React from "react";

interface IssueFilterBarProps {
  openCount: number;
  closedCount: number;
  allCount: number;
  filter: "ALL" | "OPEN" | "CLOSED";
  setFilter: (f: "ALL" | "OPEN" | "CLOSED") => void;
}

export const IssueFilterBar: React.FC<IssueFilterBarProps> = ({
  openCount,
  closedCount,
  allCount,
  filter,
  setFilter,
}) => (
  <Stack
    direction="row"
    spacing={2}
    alignItems="center"
    mb={4}
    flexWrap="wrap"
    justifyContent="center"
  >
    <Chip
      label={`OPEN: ${openCount}`}
      color="success"
      sx={{
        bgcolor: "#388e3c",
        color: "#fff",
        fontWeight: 700,
        fontSize: 16,
        px: 2,
        height: 36,
      }}
    />
    <Chip
      label={`CLOSED: ${closedCount}`}
      color="error"
      sx={{
        bgcolor: "#c62828",
        color: "#fff",
        fontWeight: 700,
        fontSize: 16,
        px: 2,
        height: 36,
      }}
    />
    <Chip
      label={`ALL: ${allCount}`}
      color="info"
      sx={{
        bgcolor: "#263043",
        color: "#90caf9",
        fontWeight: 700,
        fontSize: 16,
        px: 2,
        height: 36,
      }}
    />
    <Box flexGrow={1} />
    <Button
      variant={filter === "ALL" ? "contained" : "outlined"}
      color="info"
      size="medium"
      sx={{
        mr: 1,
        bgcolor: filter === "ALL" ? "#263043" : undefined,
        color: filter === "ALL" ? "#90caf9" : "#90caf9",
        fontWeight: 700,
        borderRadius: 2,
        borderColor: "#263043",
        minWidth: 90,
        height: 36,
      }}
      onClick={() => setFilter("ALL")}
    >
      ALL
    </Button>
    <Button
      variant={filter === "OPEN" ? "contained" : "outlined"}
      color="success"
      size="medium"
      sx={{
        mr: 1,
        bgcolor: filter === "OPEN" ? "#388e3c" : undefined,
        color: "#fff",
        fontWeight: 700,
        borderRadius: 2,
        borderColor: "#388e3c",
        minWidth: 90,
        height: 36,
      }}
      onClick={() => setFilter("OPEN")}
    >
      OPEN
    </Button>
    <Button
      variant={filter === "CLOSED" ? "contained" : "outlined"}
      color="error"
      size="medium"
      sx={{
        bgcolor: filter === "CLOSED" ? "#c62828" : undefined,
        color: "#fff",
        fontWeight: 700,
        borderRadius: 2,
        borderColor: "#c62828",
        minWidth: 90,
        height: 36,
      }}
      onClick={() => setFilter("CLOSED")}
    >
      CLOSED
    </Button>
  </Stack>
);
