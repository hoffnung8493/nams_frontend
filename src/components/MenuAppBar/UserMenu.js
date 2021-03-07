import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

const UserMenu = ({ me, client }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear();
    client.cache.reset();
  };

  return (
    <div>
      <Button
        style={{ color: "white", borderColor: "white" }}
        variant="outlined"
        className={classes.link}
        onClick={handleClick}
      >
        {me.nickname}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/mypage/reviews" style={{ textDecoration: "none" }}>
          <MenuItem onClick={handleClose}>My 리뷰</MenuItem>
        </Link>
        <Link to="/myform" style={{ textDecoration: "none" }}>
          <MenuItem onClick={handleClose}>자아성찰</MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            logout();
            handleClose();
          }}
        >
          로그아웃
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
