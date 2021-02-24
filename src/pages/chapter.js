import { Container } from "@material-ui/core";
import React, { useState } from "react";
import CustomForm from "../components/CustomForm";
import { books } from "../data";
import ReviewList from "../components/ReviewList";
import { useQuery, useMutation } from "@apollo/client";
import { ME, REVIEW_CREATE, REVIEW_FRAGMENT } from "../graphql";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const Chapter = ({
  match: {
    params: { bookNumber, chapterNumber },
  },
}) => {
  bookNumber = parseInt(bookNumber);
  chapterNumber = parseInt(chapterNumber);
  const book = books.find((v) => v.id === bookNumber);
  const chapter = book.chapters.find((v) => v.id === chapterNumber);
  const { data } = useQuery(ME, {
    onError: (err) => console.error({ err }),
  });
  const [content, setContent] = useState("");
  const mutationHook = useMutation(REVIEW_CREATE, {
    variables: { chapterNumber, bookNumber, content },
    update: (cache, { data: { reviewCreate } }) => {
      cache.modify({
        fields: {
          reviews(existingReviews = []) {
            const newReview = cache.writeFragment({
              data: reviewCreate,
              fragment: REVIEW_FRAGMENT,
            });
            return [...existingReviews, newReview];
          },
        },
      });
      setContent("");
    },
    onError: (err) => {
      console.warn(err);
    },
  });
  return (
    <Container style={{ maxWidth: 590 }}>
      <h1>{book.name}</h1>
      <h2 style={{ marginBottom: "35px" }}>{chapter.name}</h2>
      {data?.me ? (
        <CustomForm
          content={content}
          setContent={setContent}
          mutationHook={mutationHook}
          rows={4}
        />
      ) : (
        <Link to="/signin" style={{ textDecoration: "none" }}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            style={{
              height: "120px",
              fontSize: "23px",
              letterSpacing: "3px",
            }}
          >
            로그인하고&nbsp;
            <span style={{ fontWeight: 700 }}>후기 남기기</span>
          </Button>
        </Link>
      )}
      <ReviewList bookNumber={bookNumber} chapterNumber={chapterNumber} />
    </Container>
  );
};

export default Chapter;
