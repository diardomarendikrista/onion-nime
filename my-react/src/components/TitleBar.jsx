import React from 'react'
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

export default function SearchForm (props) {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const defaultURL = useSelector(state => state.defaultURL)
  
  const goToHome = (event) => {
    event.preventDefault();
    dispatch({ type: 'baseURL/setBaseURL', payload: defaultURL })
    history.push('/')
  }

  const goToFavourite = (event) => {
    event.preventDefault();
    dispatch({ type: 'baseURL/setBaseURL', payload: defaultURL })
    history.push('/favourites')
  }

  let classHome = "page-title-menu";
  let classFavourite = "page-title-menu";
  if (location.pathname === '/') {
    classHome = "active";
  }
  if (location.pathname === '/favourites') {
    classFavourite = "active";
  }

  return (
    <>
      <h1 onClick={(event) => goToHome(event)} className="page-title text-center">
        OnioNime
      </h1>
      <div className="text-center">
        <a href="/#" className={classHome} onClick={(event) => goToHome(event)}>Home</a>
        <a href="/#" className={classFavourite} onClick={(event) => goToFavourite(event)}>Favourite</a>
      </div>
    </>
  )
}