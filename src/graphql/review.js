import { gql } from "@apollo/client";
import { COMMENT_FRAGMENT } from "./index";

export const REVIEW_FRAGMENT = gql`
  fragment REVIEW_FRAGMENT on Review {
    id
    bookNumber
    chapterNumber
    content
    user {
      userId
      nickname
      isAdmin
    }
    commentCount
    likeCount
    likes
    updatedAt
  }
`;

export const REVIEWS = gql`
  query($bookNumber: Float!, $chapterNumber: Float!) {
    reviews(bookNumber: $bookNumber, chapterNumber: $chapterNumber) {
      ...REVIEW_FRAGMENT
      comments {
        ...COMMENT_FRAGMENT
      }
    }
  }
  ${REVIEW_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export const REVIEW_CREATE = gql`
  mutation($content: String!, $chapterNumber: Float!, $bookNumber: Float!) {
    reviewCreate(
      content: $content
      chapterNumber: $chapterNumber
      bookNumber: $bookNumber
    ) {
      ...REVIEW_FRAGMENT
    }
  }
  ${REVIEW_FRAGMENT}
`;

export const REVIEW_UPDATE = gql`
  mutation($reviewId: String!, $content: String!) {
    reviewUpdate(reviewId: $reviewId, content: $content) {
      ...REVIEW_FRAGMENT
    }
  }
  ${REVIEW_FRAGMENT}
`;

export const REVIEW_DELETE = gql`
  mutation($reviewId: String!) {
    reviewDelete(reviewId: $reviewId)
  }
`;

export const MY_REVIEWS = gql`
  query {
    myReviews {
      ...REVIEW_FRAGMENT
      comments {
        ...COMMENT_FRAGMENT
      }
    }
  }
  ${REVIEW_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export const REVIEW_LIKE = gql`
  mutation($reviewId: String!) {
    reviewLike(id: $reviewId) {
      ...REVIEW_FRAGMENT
    }
  }
  ${REVIEW_FRAGMENT}
`;

export const REVIEW_LIKE_CANCEL = gql`
  mutation($reviewId: String!) {
    reviewLikeCancel(id: $reviewId) {
      ...REVIEW_FRAGMENT
    }
  }
  ${REVIEW_FRAGMENT}
`;
