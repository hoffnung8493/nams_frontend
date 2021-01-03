import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginBottom: theme.spacing(1),
      width: "100%",
    },
  },
}));

export default function MultilineTextFields({
  content,
  setContent,
  mutationHook,
  isUpdate = false,
  updateCancel,
}) {
  const classes = useStyles();
  const [reviewMutate, { loading, error }] = mutationHook;
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        reviewMutate();
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
        {isUpdate ? "수정하기" : "제출하기"}
      </Button>
      {isUpdate && (
        <Button
          style={{ marginTop: "7px" }}
          variant="contained"
          color="secondary"
          fullWidth
          onClick={updateCancel}
        >
          수정 취소
        </Button>
      )}
      {error && <p>오류가 발생했습니다.. {error.message}</p>}
      {loading && <h2>후기 생성중</h2>}
    </form>
  );
}
