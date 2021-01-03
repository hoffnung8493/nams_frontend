import React, { useState } from "react";
import Review from "./Review/index";
import { MY_REVIEWS } from "../graphql/query";
import { useQuery } from "@apollo/client";
import { books } from "../data";
import { Button } from "@material-ui/core";

const BY_CHAPTER = "챕터 내림차순";
const BY_UPDATED_AT = "작성순";

const ReviewList = () => {
  const [sortBy, setSortBy] = useState(BY_CHAPTER);
  const { loading, error, data } = useQuery(MY_REVIEWS);
  if (loading) return <h2>후기들을 불러오는 중입니다...</h2>;
  if (error) {
    console.error(error);
    return <h2>앗! 오류가 발생했습니다...</h2>;
  }

  const toggle = () => {
    if (sortBy === BY_CHAPTER) setSortBy(BY_UPDATED_AT);
    else setSortBy(BY_CHAPTER);
  };
  const renderedPosts = data.myReviews
    .slice()
    .sort((a, b) => {
      if (sortBy === BY_CHAPTER)
        return a.bookNumber - b.bookNumber || a.chapterNumber - b.chapterNumber;
      else return new Date(b.updatedAt) - new Date(a.updatedAt);
    })
    .map((review) => {
      const chapter = books
        .find((v) => v.id === review.bookNumber)
        .chapters.find((v) => v.id === review.chapterNumber);
      return (
        <div key={review.id}>
          <h4
            style={{ marginBottom: 0, paddingBottom: 0 }}
          >{`${review.bookNumber} - ${review.chapterNumber} ${chapter.name}`}</h4>
          <Review review={review} />
        </div>
      );
    });

  return (
    <>
      <Button variant="contained" onClick={toggle}>
        {sortBy}
      </Button>
      {renderedPosts}
    </>
  );
};

export default ReviewList;
