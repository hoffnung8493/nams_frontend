import { Container } from "@material-ui/core";
import React, { useState } from "react";
import CustomForm from "../components/CustomForm";
import ReviewList from "../components/ReviewList";
import { useQuery, useMutation } from "@apollo/client";
import { ME, REVIEW_CREATE, REVIEW_FRAGMENT } from "../graphql";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const ReviewPage = () => {
  const { data } = useQuery(ME, {
    onError: (err) => console.error({ err }),
  });
  const bookNumber = 0;
  const chapterNumber = 0;
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
    <Container>
      <h1>사람멀미 처방전</h1>
      <h2>전체후기</h2>
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

export default ReviewPage;
