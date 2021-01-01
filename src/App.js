import React from "react";
import MenuAppBar from "./components/MenuAppBar";
import Chapter from "./pages/chapter";
import Review from "./pages/review";
import Signup from "./pages/signup";
import Signin from "./pages/signin";

import { Route } from "react-router-dom";

const App = () => {
  console.log({ env: process.NODE_ENV });
  return (
    <div>
      <MenuAppBar>
        <Route
          path="/books/:bookNumber/chapters/:chapterNumber"
          component={Chapter}
        />
        <Route path="/review" component={Review} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
      </MenuAppBar>
    </div>
  );
};

export default App;
