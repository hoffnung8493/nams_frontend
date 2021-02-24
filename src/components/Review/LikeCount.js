import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { IconButton } from "@material-ui/core";

const LikeCount = ({ likeCount, onLikeClick, color }) => {
  return (
    <IconButton
      aria-label="likeCount"
      style={{ fontSize: 20 }}
      onClick={onLikeClick}
      color={color}
    >
      <FavoriteIcon style={{ fontSize: 20, marginRight: 3 }} />
      {likeCount}
    </IconButton>
  );
};

export default LikeCount;
