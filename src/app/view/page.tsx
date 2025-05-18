"use client";

import { Box, Paper, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";

import { IssueFilterBar } from "@/components/IssueFilterBar";
import { IssueList } from "@/components/IssueList";

type Comment = {
  id: string;
  author: { login: string };
  body: string;
  createdAt: string;
};

interface ProjectField {
  name: string;
  value?: string;
}

interface Issue {
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

async function getIssues(): Promise<Issue[]> {
  const res = await fetch("/sample.json");
  const data = await res.json();
  return data.organization.projectV2.items.nodes.map(
    (item: { content: Issue; fieldValues?: { nodes?: unknown[] } }) => {
      const content = item.content;
      // Projectのフィールド情報を抽出
      const projectFields: ProjectField[] = (item.fieldValues?.nodes || [])
        .filter(
          (
            f
          ): f is { field?: { name?: string }; text?: string; name?: string } =>
            !!f && typeof f === "object" && ("text" in f || "name" in f)
        )
        .map((f) => ({
          name: f.field?.name || f.name || "",
          value:
            typeof f.text === "string"
              ? f.text
              : typeof f.name === "string"
                ? f.name
                : "",
        }));
      return { ...content, projectFields };
    }
  );
}

export default function ViewPage() {
  const [issues, setIssues] = React.useState<Issue[]>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [filter, setFilter] = useState<"ALL" | "OPEN" | "CLOSED">("ALL");
  const filteredIssues = issues.filter((issue) => {
    if (filter !== "ALL") {
      if (filter === "OPEN" && issue.state !== "OPEN") return false;
      if (filter === "CLOSED" && issue.state === "OPEN") return false;
    }
    return true;
  });
  const openCount = issues.filter((issue) => issue.state === "OPEN").length;
  const closedCount = issues.filter((issue) => issue.state !== "OPEN").length;

  React.useEffect(() => {
    getIssues().then((issues) => {
      setIssues(issues);
    });
  }, []);

  return (
    <>
      <Paper elevation={0} sx={{ bgcolor: "transparent", mb: 4 }}>
        <Typography
          variant="h3"
          fontWeight={900}
          mb={1}
          color="#90caf9"
          letterSpacing={1.5}
          sx={{ textAlign: "center", textShadow: "0 2px 16px #0a1929" }}
        >
          <span style={{ verticalAlign: "middle" }}>GitHub Issues Viewer</span>
        </Typography>
      </Paper>
      <IssueFilterBar
        openCount={openCount}
        closedCount={closedCount}
        allCount={issues.length}
        filter={filter}
        setFilter={setFilter}
      />
      <IssueList
        issues={filteredIssues}
        openIdx={openIdx}
        setOpenIdx={setOpenIdx}
      />
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Button
          variant="contained"
          color="info"
          size="large"
          href="/"
          sx={{
            px: 6,
            py: 2,
            fontWeight: 900,
            borderRadius: 4,
            bgcolor: "#263043",
            color: "#90caf9",
            fontSize: 18,
            boxShadow: "0 2px 16px #0a1929",
            ":hover": { bgcolor: "#181c24", color: "#fff" },
          }}
        >
          TOPへ戻る
        </Button>
      </Box>
    </>
  );
}
