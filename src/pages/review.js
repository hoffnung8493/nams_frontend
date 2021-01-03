import React from "react";
import Review from "../components/Review/index";
import ReviewForm from "../components/reviewForm";
import { sampleReviews } from "../data";
import { Container } from "@material-ui/core";

const ReviewPage = (a, b, c, d) => {
  const bookId = 0;
  const chapterId = 0;
  const renderedPosts = sampleReviews
    .filter(
      ({ bookNumber, chapterNumber }) =>
        bookNumber === bookId && chapterNumber === chapterId
    )
    .map((review) => <Review review={review} key={review.id} />);
  return (
    <Container>
      <h1>사람멀미 처방전</h1>
      <h2>전체후기</h2>
      <ReviewForm />
      {renderedPosts}
    </Container>
  );
};

export default ReviewPage;
