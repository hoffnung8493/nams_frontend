import { Container } from "@material-ui/core";
import React from "react";
import MyReviewList from "../components/MyReviewList";

const MyReviews = () => {
  return (
    <Container>
      <h1>내가 작성한 후기들</h1>
      <MyReviewList />
    </Container>
  );
};

export default MyReviews;
