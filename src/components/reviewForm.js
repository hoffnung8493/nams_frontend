import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/client";
import { REVIEW_CREATE, reviewFragment } from "../graphql/query";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(1),
      width: "100%",
    },
  },
}));

export default function MultilineTextFields({ bookNumber, chapterNumber }) {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [reviewCreate, { loading, error }] = useMutation(REVIEW_CREATE, {
    variables: { chapterNumber, bookNumber, content },
    update: (cache, { data: { reviewCreate } }) => {
      cache.modify({
        fields: {
          reviews(existingReviews = []) {
            const newReview = cache.writeFragment({
              data: reviewCreate,
              fragment: reviewFragment,
            });
            return [...existingReviews, newReview];
          },
        },
      });
    },
    onError: (err) => {
      console.warn(err);
    },
  });

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        reviewCreate();
        setContent("");
      }}
    >
      <div>
        <TextField
          id="outlined-multiline-static"
          label="본문"
          multiline
          rows={4}
          placeholder="본문을 입력해주세요"
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      {content.length < 10 && (
        <span style={{ color: "grey" }}>
          {10 - content.length}자 이상 입력헤주세요
        </span>
      )}
      <Button
        type="submit"
        variant="contained"
        disabled={content.length < 10}
        color="primary"
        fullWidth
      >
        제출하기
      </Button>
      {error && <p>오류가 발생했습니다.. {error.message}</p>}
      {loading && <h2>후기 생성중</h2>}
    </form>
  );
}
