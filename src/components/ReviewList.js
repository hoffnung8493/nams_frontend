import React from "react";
import Review from "./Review";
import { REVIEWS } from "../graphql/query";
import { useQuery } from "@apollo/client";
const ReviewList = ({ bookNumber, chapterNumber }) => {
  const { loading, error, data } = useQuery(REVIEWS, {
    variables: { bookNumber, chapterNumber },
    pollInterval: 3 * 60 * 1000,
  });
  if (loading) return <h2>후기들을 불러오는 중입니다...</h2>;
  if (error) {
    console.error(error);
    return <h2>앗! 오류가 발생했습니다...</h2>;
  }

  const renderedPosts = data.reviews.map((review) => (
    <Review review={review} key={review.id} />
  ));

  return <>{renderedPosts}</>;
};

export default ReviewList;
