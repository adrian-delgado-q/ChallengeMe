import { gql } from 'graphql-request';

export const teamsQuery = gql`
  query GetMyTeams {
    teamCollection {
      edges {
        node {
          id
          creatorId
          name
          description
          avatarUrl
          isPublic
          createdAt
          expiresAt
        }
      }
    }
  }
`;