import { useHistory } from "react-router-dom";
import React from 'react'
import { useDispatch } from 'react-redux'
import { setError } from '../store/actions/anime'
import Error from '../assets/error.gif'

export default function Loading () {
  const history = useHistory();
  const dispatch = useDispatch();

  const goToHome = () => { 
    dispatch(setError(false))
    history.push('/')
  }

  return (
    <>
      <div className="loading">
        <img src={Error} alt="error not found"/>
      </div>
      <div className="loading-home-btn text-center">
        <h3>404 Not Found</h3>
        <button onClick={() => goToHome()} className="btn btn-outline-secondary">Back to Home</button>
      </div>
    </>
  )
}