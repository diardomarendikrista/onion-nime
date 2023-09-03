import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TitleBar } from "./components";
import { getFavourite } from "store/actions/favourite";

import { Home, AnimeDetail, AnimeFavourite } from "./pages";

export default function App() {
  const dispatch = useDispatch();

  // init for read localStorage DB
  useEffect(() => {
    if (
      localStorage.getItem("favourite") &&
      JSON.parse(localStorage.getItem("favourite"))?.length > 0
    ) {
      console.log(JSON.parse(localStorage.getItem("favourite")));
      dispatch(getFavourite());
    }
  }, []);

  return (
    <Router>
      <TitleBar />
      <Switch>
        <Route path="/favourites">
          <AnimeFavourite />
        </Route>
        <Route path="/anime/:id">
          <AnimeDetail />
        </Route>
        <Route path="/anime">
          <AnimeDetail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
