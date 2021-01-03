import React from "react";
import MenuAppBar from "./components/MenuAppBar";
import Chapter from "./pages/chapter";
import Review from "./pages/review";
import Signin from "./pages/signin";
import Home from "./pages/home";
import MyReviews from "./pages/myreviews";

import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div>
      <MenuAppBar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/books/:bookNumber/chapters/:chapterNumber"
            component={Chapter}
          />
          <Route path="/review" component={Review} />
          <Route path="/signin" component={Signin} />
          <Route path="/mypage/reviews" component={MyReviews} />
        </Switch>
      </MenuAppBar>
    </div>
  );
};

export default App;
