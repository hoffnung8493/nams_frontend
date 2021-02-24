import { gql } from "@apollo/client";

export const COMMENT_FRAGMENT = gql`
  fragment COMMENT_FRAGMENT on Comment {
    id
    reviewId
    content
    user {
      userId
      nickname
      isAdmin
    }
    likeCount
    likes
    updatedAt
  }
`;

export const COMMENT_LIKE = gql`
  mutation($commentId: String!) {
    commentLike(id: $commentId) {
      ...COMMENT_FRAGMENT
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const COMMENT_LIKE_CANCEL = gql`
  mutation($commentId: String!) {
    commentLikeCancel(id: $commentId) {
      ...COMMENT_FRAGMENT
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const COMMENT_CREATE = gql`
  mutation($reviewId: String!, $content: String!) {
    commentCreate(reviewId: $reviewId, content: $content) {
      ...COMMENT_FRAGMENT
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const COMMENT_UPDATE = gql`
  mutation($commentId: String!, $content: String!) {
    commentUpdate(id: $commentId, content: $content) {
      ...COMMENT_FRAGMENT
    }
  }
  ${COMMENT_FRAGMENT}
`;

export const COMMENT_DELETE = gql`
  mutation($commentId: String!) {
    commentDelete(id: $commentId)
  }
`;
