import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import { LOG_IN, ME, SIGN_UP } from "../graphql";
import { MyFormContext } from "../context/myForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [myForm, , useMyFormMutate] = useContext(MyFormContext);
  const [mutateMyForm] = useMyFormMutate;
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const history = useHistory();

  const [login, { loading: loginLoading, error: loginError }] = useMutation(
    LOG_IN,
    {
      variables: { email, password },
      onError: (err) => console.error(err),
      update: (
        store,
        {
          data: {
            login: { user, accessToken, refreshToken },
          },
        }
      ) => {
        store.writeQuery({
          query: ME,
          data: {
            me: user,
          },
        });
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setNickname("");
        setEmail("");
        setPassword("");
        if (myForm.formJustSubmitted) {
          mutateMyForm();
          history.push("/myform");
        } else history.goBack();
      },
    }
  );

  const [signup, { loading: signupLoading, error: signupError }] = useMutation(
    SIGN_UP,
    {
      variables: { nickname, email, password },
      onError: (err) => console.error(err),
      update: (store, { data }) => {
        store.writeQuery({
          query: ME,
          data: {
            me: data.signup.user,
          },
        });
        localStorage.setItem("accessToken", signup.accessToken);
        localStorage.setItem("refreshToken", signup.refreshToken);
        setNickname("");
        setEmail("");
        setPassword("");
        if (myForm.formJustSubmitted) {
          mutateMyForm();
          history.push("/myform");
        } else history.goBack();
      },
    }
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? "로그인" : "회원가입"}
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            isLogin ? login() : signup();
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일 주소"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {!isLogin && (
            <TextField
              variant="outlined"
              margin="normal"
              autoComplete="fname"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="닉네임"
              autoFocus
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          )}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isLogin ? "로그인" : "회원가입"}
          </Button>
          {(loginLoading || signupLoading) && <p>Loading...</p>}
          <p>{(loginError || signupError) && `${loginError || signupError}`}</p>
          <p
            style={{ textDecoration: "underline" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "회원 가입하기" : "로그인하기"}
          </p>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
    </Container>
  );
}
