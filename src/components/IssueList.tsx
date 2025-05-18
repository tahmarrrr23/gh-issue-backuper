"use client";

import { Stack } from "@mui/material";

import type { Issue } from "../lib/issueLoader";
import { IssueCard } from "./IssueCard";

export const IssueList = ({
  issues,
  openIdx,
  setOpenIdx,
}: {
  issues: Issue[];
  openIdx: number | null;
  setOpenIdx: (idx: number | null) => void;
}) => (
  <Stack spacing={4}>
    {issues.map((issue, idx) => (
      <IssueCard
        key={issue.id}
        issue={issue}
        isOpen={openIdx === idx}
        onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
      />
    ))}
  </Stack>
);
