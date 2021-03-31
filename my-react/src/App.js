import './App.css';
import React from 'react'
import Home from './pages/Home.jsx'
import AnimeDetail from './pages/AnimeDetail.jsx'
import AnimeFavourite from './pages/AnimeFavourite.jsx'
import TitleBar from './components/TitleBar.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function App () {
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
  )
}
