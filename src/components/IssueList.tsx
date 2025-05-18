"use client";

import { Stack } from "@mui/material";
import React from "react";

import type { Issue } from "@/components/IssueCard";
import { IssueCard } from "@/components/IssueCard";

interface IssueListProps {
  issues: Issue[];
  openIdx: number | null;
  setOpenIdx: (idx: number | null) => void;
}

export const IssueList: React.FC<IssueListProps> = ({
  issues,
  openIdx,
  setOpenIdx,
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
