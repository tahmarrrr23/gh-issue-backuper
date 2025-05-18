import { graphql } from "@octokit/graphql";

const GQL_PROJECTS_QUERY = `
  query($owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo) {
      projectsV2(first: 10) {
        nodes {
          id
          title
          number
          fields(first: 50) {
            nodes {
              ... on ProjectV2Field {
                id
                name
                dataType
              }
              ... on ProjectV2IterationField {
                id
                name
                configuration {
                  iterations { id title }
                }
              }
              ... on ProjectV2SingleSelectField {
                id
                name
                options { id name color }
              }
            }
          }
          items(first: 100) {
            nodes {
              id
              content {
                ... on Issue {
                  id number title body state url createdAt updatedAt closedAt
                  author { login }
                  assignees(first: 10) { nodes { login } }
                  labels(first: 20) { nodes { name } }
                  milestone { title }
                  comments { totalCount }
                  reactions { totalCount }
                }
                ... on PullRequest {
                  id number title body state url createdAt updatedAt closedAt
                  author { login }
                }
              }
              fieldValues(first: 20) {
                nodes {
                  __typename
                  ... on ProjectV2ItemFieldSingleSelectValue {
                    field { ... on ProjectV2Field { id name } }
                    name
                    optionId
                  }
                  ... on ProjectV2ItemFieldTextValue {
                    field { ... on ProjectV2Field { id name } }
                    text
                  }
                  ... on ProjectV2ItemFieldNumberValue {
                    field { ...on ProjectV2Field { id name } }
                    number
                  }
                  ... on ProjectV2ItemFieldDateValue {
                    field { ...on ProjectV2Field { id name } }
                    date
                  }
                  ... on ProjectV2ItemFieldIterationValue {
                    field { ...on ProjectV2Field { id name } }
                    iterationId
                  }
                  ... on ProjectV2ItemFieldRepositoryValue {
                    field { ...on ProjectV2Field { id name } }
                    repository { id name }
                  }
                  ... on ProjectV2ItemFieldUserValue {
                    field { ...on ProjectV2Field { id name } }
                    users(first: 10) { nodes { id login } }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export async function fetchProjectV2All(token: string, repo: string) {
  const [owner, name] = repo.split("/");
  const result = await graphql(GQL_PROJECTS_QUERY, {
    owner,
    repo: name,
    headers: {
      authorization: `token ${token}`,
    },
  });
  if (
    result &&
    typeof result === "object" &&
    result !== null &&
    "repository" in result &&
    typeof result.repository === "object" &&
    result.repository !== null &&
    "projectsV2" in (result.repository as Record<string, unknown>) &&
    (
      (result.repository as Record<string, unknown>).projectsV2 as Record<
        string,
        unknown
      >
    ).nodes
  ) {
    return (
      (result.repository as Record<string, unknown>).projectsV2 as {
        nodes: unknown[];
      }
    ).nodes;
  }
  throw new Error("Unexpected GraphQL response structure");
}
