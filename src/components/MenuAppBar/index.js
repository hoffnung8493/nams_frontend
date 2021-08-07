import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { books } from "../../data";
import Button from "@material-ui/core/Button";
import { useQuery } from "@apollo/client";
import { client } from "../../apollo";
import { ME } from "../../graphql";
import HomeIcon from "@material-ui/icons/Home";
import UserMenu from "./UserMenu";
import { AppMenuContext } from "../../context/AppMenu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontSize: "18px",
    fontWeight: 700,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#172CD9",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    flexWrap: "wrap",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useContext(AppMenuContext);
  const { data } = useQuery(ME, {
    onError: (err) => console.error({ err }),
  });
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={clsx(classes.appBar)}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title}>사람멀미 처방전</Typography>
          {data && data.me ? (
            <UserMenu me={data.me} client={client} />
          ) : (
            <>
              <Link to="/signin">
                <Button
                  style={{ color: "white", borderColor: "white" }}
                  variant="outlined"
                  className={classes.link}
                >
                  로그인
                </Button>
              </Link>
            </>
          )}
          <Link to="/">
            <HomeIcon style={{ color: "white" }} />
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <h3
          style={{ marginLeft: "15px", fontSize: "20px", marginBottom: "5px" }}
        >
          <span style={{ fontSize: 15 }}>제1권.</span> {books[0].short}
        </h3>
        <List onClick={handleDrawerClose}>
          {books[0].chapters.map(({ short, id }) => (
            <Link
              to={`/books/1/chapters/${id}`}
              key={id}
              style={{ textDecoration: "none" }}
            >
              <ListItem button>
                <span style={{ fontSize: 13 }}>제{id}장.</span>
                <ListItemText style={{ marginLeft: 5 }} primary={short} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <h3
          style={{ marginLeft: "15px", fontSize: "20px", marginBottom: "5px" }}
        >
          <span style={{ fontSize: 15 }}>제2권.</span> {books[1].short}
        </h3>
        <List onClick={handleDrawerClose}>
          {books[1].chapters.map(({ short, id }) => (
            <Link
              to={`/books/2/chapters/${id}`}
              key={id}
              style={{ textDecoration: "none" }}
            >
              <ListItem button>
                <span style={{ fontSize: 13 }}>제{id}장.</span>
                <ListItemText style={{ marginLeft: 5 }} primary={short} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <h3
          style={{ marginLeft: "15px", fontSize: "20px", marginBottom: "5px" }}
        >
          <span style={{ fontSize: 15 }}>제3권.</span> {books[2].short}
        </h3>
        <List onClick={handleDrawerClose}>
          {books[2].chapters.map(({ short, id }) => (
            <Link
              to={`/books/3/chapters/${id}`}
              key={id}
              style={{ textDecoration: "none" }}
            >
              <ListItem button>
                <span style={{ fontSize: 13 }}>제{id}장.</span>
                <ListItemText style={{ marginLeft: 5 }} primary={short} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <h3
          style={{
            marginLeft: "15px",
            fontSize: "20px",
            marginBottom: "5px",
          }}
          onClick={handleDrawerClose}
        >
          <Link style={{ textDecoration: "none" }} to="/review">
            사람멀미 처방전 전체후기
          </Link>
        </h3>
      </Drawer>
      <main>
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
}
