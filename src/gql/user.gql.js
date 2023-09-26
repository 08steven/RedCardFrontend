import { gql } from "graphql-tag";

export const REGISTER_USER = gql`
  mutation registerUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput)
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      email
      id
      image
      name
      password
      role
      token
      username
    }
  }
`;
