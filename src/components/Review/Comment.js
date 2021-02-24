import React, { useState } from "react";
import {
  Card,
  Typography,
  CardContent,
  CardActions,
  makeStyles,
} from "@material-ui/core";
import CustomCardHeader from "./CustomCardHeader";
import CustomForm from "../CustomForm";
import { useMutation, useQuery } from "@apollo/client";
import {
  COMMENT_UPDATE,
  COMMENT_DELETE,
  REVIEWS,
  ME,
  COMMENT_LIKE,
  COMMENT_LIKE_CANCEL,
} from "../../graphql";
import produce from "immer";
import LikeCount from "./LikeCount";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

const Comment = ({ comment, bookNumber, chapterNumber }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [content, setContent] = useState(comment.content);
  const updateHook = useMutation(COMMENT_UPDATE, {
    variables: { commentId: comment.id, content },
    onCompleted: () => setIsUpdate(false),
  });
  const deleteHook = useMutation(COMMENT_DELETE, {
    variables: { commentId: comment.id },
    update: (cache) => {
      const state1 = cache.readQuery({
        query: REVIEWS,
        variables: { bookNumber, chapterNumber },
      });
      cache.writeQuery({
        query: REVIEWS,
        variables: { bookNumber, chapterNumber },
        data: produce(state1, (draftState) => {
          let review = draftState.reviews.find(
            (v) => v.id === comment.reviewId
          );
          review.comments = review.comments.filter((v) => v.id !== comment.id);
          review.commentCount--;
        }),
      });
    },
  });

  const [mutateLike] = useMutation(COMMENT_LIKE, {
    variables: { commentId: comment.id },
  });
  const [mutateLikeCancel] = useMutation(COMMENT_LIKE_CANCEL, {
    variables: { commentId: comment.id },
  });
  const { data } = useQuery(ME);
  const onLikeClick = () => {
    if (!data?.me) return;
    if (comment.likes.includes(data.me.id)) mutateLikeCancel();
    else mutateLike();
  };

  const classes = useStyles();
  if (isUpdate)
    return (
      <div style={{ marginBottom: "30px" }}>
        <CustomForm
          content={content}
          setContent={setContent}
          mutationHook={updateHook}
          isUpdate={true}
          updateCancel={() => setIsUpdate(false)}
          rows={4}
        />
      </div>
    );
  return (
    <Card className={classes.root} variant="outlined">
      <CustomCardHeader
        userId={comment.user.userId}
        nickname={comment.user.nickname}
        updatedAt={comment.updatedAt}
        setIsUpdate={setIsUpdate}
        deleteHook={deleteHook}
      />
      <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Typography>{comment.content}</Typography>
      </CardContent>
      <CardActions style={{ paddingTop: 0, paddingBottom: 0 }}>
        <LikeCount
          onLikeClick={onLikeClick}
          likeCount={comment.likeCount}
          color={comment.likes.includes(data?.me.id) ? "secondary" : ""}
        />
      </CardActions>
    </Card>
  );
};

export default Comment;
