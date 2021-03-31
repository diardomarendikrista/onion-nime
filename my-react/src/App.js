import './App.css';
import React from 'react'
import Home from './views/Home.jsx'
import AnimeDetail from './views/AnimeDetail.jsx'
import TitleBar from './components/TitleBar.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default function App () {
  return (
    <>
      <TitleBar />
      <Router>
        <Switch>
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
    </>
  )
}
