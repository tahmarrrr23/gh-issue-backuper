import { graphql } from "@octokit/graphql";

// Function to fetch all data from ProjectV2
export async function fetchProjectV2All(
  token: string,
  org: string,
  projectNumber: number
) {
  if (!org || !projectNumber)
    throw new Error("Please enter both organization name and project number");

  // No need to get project ID, query directly with org and projectNumber
  const query = `
    query($org: String!, $number: Int!) {
      organization(login: $org) {
        projectV2(number: $number) {
          ... on ProjectV2 {
            id
            title
            url
            creator { login }
            createdAt
            updatedAt
            items(first: 100) {
              nodes {
                id
                content {
                  ... on Issue {
                    id
                    number
                    title
                    url
                    state
                    createdAt
                    updatedAt
                    author { login }
                    assignees(first: 5) { nodes { login } }
                    labels(first: 10) { nodes { name color } }
                    body
                    comments(first: 30) {
                      nodes {
                        id
                        author { login }
                        body
                        createdAt
                      }
                    }
                  }
                  ... on PullRequest {
                    id
                    number
                    title
                    url
                    state
                    createdAt
                    updatedAt
                    author { login }
                    assignees(first: 5) { nodes { login } }
                    labels(first: 10) { nodes { name color } }
                    body
                    comments(first: 30) {
                      nodes {
                        id
                        author { login }
                        body
                        createdAt
                      }
                    }
                  }
                }
                fieldValues(first: 20) {
                  nodes {
                    ... on ProjectV2ItemFieldTextValue {
                      text
                      field { ... on ProjectV2FieldCommon { name } }
                    }
                    ... on ProjectV2ItemFieldDateValue {
                      date
                      field { ... on ProjectV2FieldCommon { name } }
                    }
                    ... on ProjectV2ItemFieldSingleSelectValue {
                      name
                      field { ... on ProjectV2FieldCommon { name } }
                    }
                    ... on ProjectV2ItemFieldNumberValue {
                      number
                      field { ... on ProjectV2FieldCommon { name } }
                    }
                  }
                }
              }
            }
            fields(first: 20) {
              nodes {
                ... on ProjectV2FieldCommon { id name }
                ... on ProjectV2SingleSelectField {
                  id
                  name
                  options { id name color }
                }
              }
            }
          }
        }
      }
    }
  `;
  const result = await graphql(query, {
    org,
    number: projectNumber,
    headers: { authorization: `token ${token}` },
  });
  return result;
}
