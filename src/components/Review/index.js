import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import CommentIcon from "@material-ui/icons/Comment";
import VertMenu from "./VertMenu";
import { useMutation } from "@apollo/client";
import { REVIEW_UPDATE, REVIEW_DELETE } from "../../graphql/query";
import ReviewForm from "../reviewForm";
import { books } from "../../data";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: 50,
  },
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
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard({
  review: {
    id: reviewId,
    content: oldContent,
    commentCount,
    likes,
    updatedAt,
    bookNumber,
    chapterNumber,
    user: { nickname, id: userId },
  },
}) {
  const chapter = books
    .find((v) => v.id === bookNumber)
    .chapters.find((v) => v.id === chapterNumber);
  const classes = useStyles();
  const [content, setContent] = useState(oldContent);
  const [isUpdate, setIsUpdate] = useState(false);
  const updateHook = useMutation(REVIEW_UPDATE, {
    variables: { reviewId, content },
    onCompleted: () => setIsUpdate(false),
  });
  const [reviewDelete, { errorDelete, loadingDelete }] = useMutation(
    REVIEW_DELETE,
    {
      variables: { reviewId },
      update: (cache) => {
        cache.modify({
          fields: {
            reviews(existingReviews = [], { readField }) {
              return existingReviews.filter(
                (reviewRef) => reviewId !== readField("id", reviewRef)
              );
            },
          },
        });
      },
    }
  );

  if (isUpdate)
    return (
      <div style={{ marginBottom: "30px" }}>
        <h4>{`${bookNumber} - ${chapterNumber} ${chapter.name}`}</h4>
        <ReviewForm
          content={content}
          setContent={setContent}
          mutationHook={updateHook}
          isUpdate={true}
          updateCancel={() => setIsUpdate(false)}
        />
      </div>
    );
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {nickname[0]}
          </Avatar>
        }
        action={
          <VertMenu
            userId={userId}
            isUpdate={setIsUpdate}
            reviewDelete={reviewDelete}
          />
        }
        title={nickname}
        subheader={new Date(updatedAt).toLocaleDateString("ko", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {oldContent}
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon /> {likes}
        </IconButton>
        <IconButton aria-label="share">
          <CommentIcon /> {commentCount}
        </IconButton>
      </CardActions> */}
    </Card>
  );
}
