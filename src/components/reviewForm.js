import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/client";
import { REVIEW_CREATE, reviewFragment } from "../graphql/query";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "90ch",
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
      <Button
        type="submit"
        variant="contained"
        style={{ marginLeft: 10, backgroundColor: "#3C79E1", color: "white" }}
      >
        제출하기
      </Button>
      {error && <h2>오류가 발생했습니다..</h2>}
      {loading && <h2>후기 생성중</h2>}
    </form>
  );
}
