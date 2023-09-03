import "./App.css";
import React from "react";
import { TitleBar } from "./components";

import { Home, AnimeDetail, AnimeFavourite } from "./pages";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
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
