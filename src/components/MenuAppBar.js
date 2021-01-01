import React from "react";
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
import { books } from "../data";
import Button from "@material-ui/core/Button";
import { useQuery } from "@apollo/client";
import { client } from "../apollo";
import { ME } from "../graphql/query";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
  const [open, setOpen] = React.useState(false);
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
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            사람멀미 처방전 - 직장인의 마음(心), 귀(耳), 입(口) 사용법
          </Typography>
          {data && data.me ? (
            <Button
              style={{ color: "white", borderColor: "white" }}
              variant="outlined"
              className={classes.link}
              onClick={() => {
                localStorage.clear();
                client.cache.reset();
              }}
            >
              {data?.me?.nickname} - 로그아웃
            </Button>
          ) : (
            <>
              <Link to="/signup">
                <Button
                  style={{ color: "white", borderColor: "white" }}
                  variant="outlined"
                  className={classes.link}
                >
                  회원가입
                </Button>
              </Link>
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
          {books[0].short}
        </h3>
        <List>
          {books[0].chapters.map(({ short, id }) => (
            <Link
              to={`/books/1/chapters/${id}`}
              key={id}
              style={{ textDecoration: "none" }}
            >
              <ListItem button>
                <ListItemText primary={short} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <h3
          style={{ marginLeft: "15px", fontSize: "20px", marginBottom: "5px" }}
        >
          {books[1].short}
        </h3>
        <List>
          {books[1].chapters.map(({ short, id }) => (
            <Link
              to={`/books/2/chapters/${id}`}
              key={id}
              style={{ textDecoration: "none" }}
            >
              <ListItem button>
                <ListItemText primary={short} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <h3
          style={{ marginLeft: "15px", fontSize: "20px", marginBottom: "5px" }}
        >
          {books[2].short}
        </h3>
        <List>
          {books[2].chapters.map(({ short, id }) => (
            <Link
              to={`/books/3/chapters/${id}`}
              key={id}
              style={{ textDecoration: "none" }}
            >
              <ListItem button>
                <ListItemText primary={short} />
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
        >
          <Link style={{ textDecoration: "none" }} to="/review">
            사람멀미 처방전 전체후기
          </Link>
        </h3>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
}
