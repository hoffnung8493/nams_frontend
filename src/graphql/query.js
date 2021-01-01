import { gql } from "@apollo/client";

export const ME = gql`
  query {
    me {
      nickname
      email
    }
  }
`;

export const LOG_IN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
      user {
        nickname
        email
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation($email: String!, $password: String!, $nickname: String!) {
    signup(email: $email, password: $password, nickname: $nickname) {
      accessToken
      refreshToken
      user {
        nickname
        email
      }
    }
  }
`;

export const reviewFragment = gql`
  fragment reviewFragment on Review {
    id
    bookNumber
    chapterNumber
    content
    user {
      id
      nickname
    }
    commentCount
  }
`;

export const REVIEWS = gql`
  query($bookNumber: Float!, $chapterNumber: Float!) {
    reviews(bookNumber: $bookNumber, chapterNumber: $chapterNumber) {
      ...reviewFragment
    }
  }
  ${reviewFragment}
`;

export const REVIEW_CREATE = gql`
  mutation($content: String!, $chapterNumber: Float!, $bookNumber: Float!) {
    reviewCreate(
      content: $content
      chapterNumber: $chapterNumber
      bookNumber: $bookNumber
    ) {
      ...reviewFragment
    }
  }
  ${reviewFragment}
`;
