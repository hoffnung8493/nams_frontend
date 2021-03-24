import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import { useMutation, useQuery } from "@apollo/client";
import {
  REVIEW_UPDATE,
  REVIEW_DELETE,
  COMMENT_CREATE,
  REVIEWS,
  REVIEW_LIKE,
  REVIEW_LIKE_CANCEL,
  ME,
} from "../../graphql";
import CustomForm from "../CustomForm";
import { books } from "../../data";
import Comment from "./Comment";
import CustomCardHeader from "./CustomCardHeader";
import produce from "immer";
import LikeCount from "./LikeCount";

const Review = ({
  review: {
    id: reviewId,
    bookNumber,
    chapterNumber,
    content: oldContent,
    user: { nickname, userId },
    commentCount,
    likeCount,
    likes,
    comments = [],
    updatedAt,
  },
}) => {
  const useStyles = makeStyles((theme) => ({
    root: comments.find((v) => v.user.isAdmin)
      ? {
          width: "100%",
          marginBottom: 5,
          borderRadius: 3,
          boxShadow: "0 4px 6px 3px rgba(255, 105, 135, .3)",
        }
      : { width: "100%", marginBottom: 5, borderRadius: 3 },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  }));

  const chapter = books
    .find((v) => v.id === bookNumber)
    .chapters.find((v) => v.id === chapterNumber);
  const classes = useStyles();
  const [content, setContent] = useState(oldContent);
  const [isUpdate, setIsUpdate] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const onShowCommentsClick = () => setShowComments(!showComments);

  const updateHook = useMutation(REVIEW_UPDATE, {
    variables: { reviewId, content },
    onCompleted: () => setIsUpdate(false),
  });
  const deleteHook = useMutation(REVIEW_DELETE, {
    variables: { reviewId },
    update: (cache) => {
      cache.modify({
        fields: {
          reviews(existingReviews = [], { readField }) {
            return existingReviews.filter(
              (reviewRef) => reviewId !== readField("id", reviewRef)
            );
          },
          myReviews(existingReviews = [], { readField }) {
            return existingReviews.filter(
              (reviewRef) => reviewId !== readField("id", reviewRef)
            );
          },
        },
      });
    },
  });

  const [commentContent, setCommentContent] = useState("");
  const createCommentHook = useMutation(COMMENT_CREATE, {
    variables: { reviewId, content: commentContent },
    update: (cache, { data: { commentCreate } }) => {
      const state1 = cache.readQuery({
        query: REVIEWS,
        variables: { bookNumber, chapterNumber },
      });
      cache.writeQuery({
        query: REVIEWS,
        variables: { bookNumber, chapterNumber },
        data: produce(state1, (draftState) => {
          let review = draftState.reviews.find((v) => v.id === reviewId);
          if (review) {
            review.comments.push(commentCreate);
            review.commentCount++;
          }
        }),
      });
      setCommentContent("");
    },
  });
  const [mutateLike] = useMutation(REVIEW_LIKE, { variables: { reviewId } });
  const [mutateLikeCancel] = useMutation(REVIEW_LIKE_CANCEL, {
    variables: { reviewId },
  });
  const { data } = useQuery(ME);
  const onLikeClick = () => {
    if (!data?.me) return;
    if (likes.includes(data.me.id)) mutateLikeCancel();
    else mutateLike();
  };

  if (isUpdate)
    return (
      <div style={{ marginBottom: "30px" }}>
        <h4>{`${bookNumber} - ${chapterNumber} ${chapter.name}`}</h4>
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
    <div style={{ marginBottom: "50px" }}>
      <Card className={classes.root}>
        <CustomCardHeader
          userId={userId}
          nickname={nickname}
          updatedAt={updatedAt}
          setIsUpdate={setIsUpdate}
          deleteHook={deleteHook}
        />
        <CardContent>
          <Typography variant="body2" component="p">
            {oldContent}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <LikeCount
            likeCount={likeCount}
            onLikeClick={onLikeClick}
            color={likes.includes(data?.me?.id) ? "secondary" : "default"}
          />

          <IconButton
            arialabel="share"
            style={{ fontSize: 20 }}
            onClick={onShowCommentsClick}
            color={showComments ? "primary" : "default"}
          >
            <CommentIcon style={{ fontSize: 20, marginRight: 3 }} />
            {commentCount}
          </IconButton>
        </CardActions>
        {showComments && (
          <div style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
            {comments.map((v) => (
              <Comment
                key={v.id}
                reviewId={reviewId}
                comment={v}
                bookNumber={bookNumber}
                chapterNumber={chapterNumber}
              />
            ))}
            <CustomForm
              content={commentContent}
              setContent={setCommentContent}
              mutationHook={createCommentHook}
              minContentLength={5}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default Review;
