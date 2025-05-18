"use client";

import { Link } from "@mui/material";
import { useEffect, useState } from "react";

import { IssueFilterBar } from "@/components/IssueFilterBar";
import { IssueList } from "@/components/IssueList";

import { getIssues, Issue } from "../../lib/issueLoader";

export default function ViewPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [filter, setFilter] = useState<"ALL" | "OPEN" | "CLOSED">("ALL");
  useEffect(() => {
    getIssues().then(setIssues);
  }, []);
  const filtered = issues.filter(
    (i) =>
      filter === "ALL" ||
      (filter === "OPEN" ? i.state === "OPEN" : i.state !== "OPEN")
  );
  const open = issues.filter((i) => i.state === "OPEN").length;
  const closed = issues.length - open;
  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>
        GitHub Issues Viewer
      </h1>
      <IssueFilterBar
        openCount={open}
        closedCount={closed}
        allCount={issues.length}
        filter={filter}
        setFilter={setFilter}
      />
      <IssueList
        issues={filtered}
        openIdx={openIdx}
        setOpenIdx={setOpenIdx as (idx: number | null) => void}
      />
      <div style={{ textAlign: "center", marginTop: 64 }}>
        <Link
          href="/"
          style={{
            padding: "16px 48px",
            fontWeight: 900,
            borderRadius: 16,
            background: "#263043",
            color: "#90caf9",
            fontSize: 18,
            textDecoration: "none",
            boxShadow: "0 2px 16px #0a1929",
          }}
        >
          TOP
        </Link>
      </div>
    </>
  );
}
