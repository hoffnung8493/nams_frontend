import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { useQuery } from "@apollo/client";
import { ME } from "../../graphql/query";

const VertMenu = ({ userId, isUpdate, reviewDelete }) => {
  const { data } = useQuery(ME, {
    onError: (err) => console.error({ err }),
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!data || !data.me || data.me.id !== userId) return <></>;
  return (
    <div>
      <IconButton aria-label="settings" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            isUpdate(true);
          }}
        >
          수정
        </MenuItem>
        <MenuItem
          style={{ color: "red" }}
          onClick={() => {
            handleClose();
            reviewDelete();
          }}
        >
          삭제
        </MenuItem>
      </Menu>
    </div>
  );
};

export default VertMenu;
