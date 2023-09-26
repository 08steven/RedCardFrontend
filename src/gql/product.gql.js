import { gql } from "graphql-tag";

export const GET_PRODUCT = gql`
  query items {
    items {
      image
      name
      price
    }
  }
`;
