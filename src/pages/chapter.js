import { Container } from "@material-ui/core";
import React from "react";
import ReviewForm from "../components/reviewForm";
import { books } from "../data";
import ReviewList from "../components/ReviewList";

const Chapter = ({
  match: {
    params: { bookNumber, chapterNumber },
  },
}) => {
  bookNumber = parseInt(bookNumber);
  chapterNumber = parseInt(chapterNumber);
  const book = books.find((v) => v.id === bookNumber);
  const chapter = book.chapters.find((v) => v.id === chapterNumber);

  return (
    <Container>
      <h1>{book.name}</h1>
      <h2>{chapter.name}</h2>
      <ReviewForm bookNumber={bookNumber} chapterNumber={chapterNumber} />
      <ReviewList bookNumber={bookNumber} chapterNumber={chapterNumber} />
    </Container>
  );
};

export default Chapter;
