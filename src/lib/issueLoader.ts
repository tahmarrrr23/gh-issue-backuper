export type Comment = {
  id: string;
  author: { login: string };
  body: string;
  createdAt: string;
};
export type ProjectField = { name: string; value?: string };
export type Issue = {
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
};
export async function getIssues(): Promise<Issue[]> {
  const res = await fetch("/sample.json");
  const data = await res.json();
  return data.organization.projectV2.items.nodes.map(
    (item: { content: Issue; fieldValues?: { nodes?: any[] } }) => {
      const content = item.content;
      const projectFields: ProjectField[] = (item.fieldValues?.nodes || [])
        .filter(
          (f: any) =>
            !!f && typeof f == "object" && ("text" in f || "name" in f)
        )
        .map((f: any) => ({
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
}
