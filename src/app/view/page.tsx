"use client";

import { Link } from "@mui/material";
import { ChangeEvent, useState } from "react";

import { IssueFilterBar } from "@/components/IssueFilterBar";
import { IssueList } from "@/components/IssueList";

import { Issue, ProjectField } from "../../lib/issueLoader";

export default function ViewPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [filter, setFilter] = useState<"ALL" | "OPEN" | "CLOSED">("ALL");
  const [fileName, setFileName] = useState<string>("");
  // File upload handler
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const text = await file.text();
    try {
      const data = JSON.parse(text);
      // Parse according to sample.json structure
      const nodes = data.organization?.projectV2?.items?.nodes || [];
      const parsed = nodes.map(
        (item: { content: Issue; fieldValues?: { nodes?: unknown[] } }) => {
          const content = item.content;
          const projectFields: ProjectField[] = (item.fieldValues?.nodes || [])
            .filter(
              (
                f
              ): f is {
                field?: { name?: string };
                name?: string;
                text?: string;
              } => !!f && typeof f == "object" && ("text" in f || "name" in f)
            )
            .map((f) => ({
              name: f.field?.name || f.name || "",
              value:
                typeof f.text == "string"
                  ? f.text
                  : typeof f.name == "string"
                    ? f.name
                    : "",
            }));
          return { ...content, projectFields };
        }
      );
      setIssues(parsed);
    } catch {
      alert("Failed to load file. Please check the format.");
      setIssues([]);
    }
  };
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
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <input
          type="file"
          accept="application/json"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id="upload-json"
        />
        <label
          htmlFor="upload-json"
          style={{ cursor: "pointer", display: "inline-block" }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "10px 32px",
              fontWeight: 700,
              borderRadius: 12,
              background: "#1976d2",
              color: "#fff",
              fontSize: 16,
              border: "none",
              cursor: "pointer",
              marginBottom: 8,
              userSelect: "none",
              boxShadow: "0 2px 8px #1976d2a0",
              transition: "background 0.2s",
            }}
            tabIndex={0}
            role="button"
            aria-label="Upload JSON file"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                (
                  document.getElementById("upload-json") as HTMLInputElement
                )?.click();
              }
            }}
          >
            Upload JSON file
          </span>
        </label>
        {fileName && (
          <div style={{ marginTop: 8, color: "#1976d2", fontWeight: 700 }}>
            Loaded: {fileName}
          </div>
        )}
      </div>
      {issues.length > 0 && (
        <>
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
        </>
      )}
      {issues.length === 0 && (
        <div style={{ textAlign: "center", color: "#888", marginTop: 32 }}>
          Uploaded backup data will be displayed here
        </div>
      )}
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
