"use client";

import { Box, Button, Chip, Stack } from "@mui/material";

export const IssueFilterBar = ({
  openCount,
  closedCount,
  allCount,
  filter,
  setFilter,
}: {
  openCount: number;
  closedCount: number;
  allCount: number;
  filter: "ALL" | "OPEN" | "CLOSED";
  setFilter: (f: "ALL" | "OPEN" | "CLOSED") => void;
}) => (
  <Stack
    direction="row"
    alignItems="center"
    mb={4}
    justifyContent="center"
    sx={{
      gap: 2,
      rowGap: 2,
      flexWrap: "wrap",
      background: (t) => t.palette.background.paper,
      borderRadius: 3,
      p: 2,
      boxShadow: 2,
      minHeight: 56,
    }}
  >
    <Chip
      label={`OPEN: ${openCount}`}
      color="success"
      sx={{ fontSize: 16, px: 2, height: 36, fontWeight: 700 }}
    />
    <Chip
      label={`CLOSED: ${closedCount}`}
      color="error"
      sx={{ fontSize: 16, px: 2, height: 36, fontWeight: 700 }}
    />
    <Chip
      label={`ALL: ${allCount}`}
      color="info"
      sx={{ fontSize: 16, px: 2, height: 36, fontWeight: 700 }}
    />
    <Box flexGrow={1} minWidth={16} />
    {["ALL", "OPEN", "CLOSED"].map((f) => (
      <Button
        key={f}
        variant={filter === f ? "contained" : "outlined"}
        color={f === "ALL" ? "info" : f === "OPEN" ? "success" : "error"}
        size="medium"
        sx={{
          minWidth: 90,
          height: 36,
          mr: f !== "CLOSED" ? 1 : 0,
          fontWeight: 700,
        }}
        onClick={() => setFilter(f as "ALL" | "OPEN" | "CLOSED")}
      >
        {f}
      </Button>
    ))}
  </Stack>
);
