import React from "react";
import { CardHeader, Avatar, makeStyles, colors } from "@material-ui/core";
import VertMenu from "./VertMenu";

const useStyles = makeStyles({ avatar: { backgroundColor: colors.red[500] } });

const CustomCardHeader = ({
  nickname,
  userId,
  updatedAt,
  setIsUpdate,
  deleteHook,
}) => {
  const classes = useStyles();
  const [mutate] = deleteHook;
  return (
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
          deleteMutate={mutate}
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
  );
};

export default CustomCardHeader;
