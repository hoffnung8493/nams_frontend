import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment USER_FRAGMENT on User {
    id
    nickname
    email
  }
`;

export const ME = gql`
  query {
    me {
      ...USER_FRAGMENT
    }
  }
  ${USER_FRAGMENT}
`;

export const LOG_IN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      user {
        ...USER_FRAGMENT
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const SIGN_UP = gql`
  mutation($email: String!, $password: String!, $nickname: String!) {
    signup(email: $email, password: $password, nickname: $nickname) {
      accessToken
      refreshToken
      user {
        ...USER_FRAGMENT
      }
    }
  }
  ${USER_FRAGMENT}
`;
