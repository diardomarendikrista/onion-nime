import { useHistory } from "react-router-dom";
import React from 'react'
import { useDispatch } from 'react-redux'
import { setError } from '../store/actions'

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
        <img src="https://media.tenor.com/images/b276eb1262c2ae17a7d94929051d7a9d/tenor.gif" alt="error loading"/>
      </div>
      <div className="loading-home-btn">
        <button onClick={() => goToHome()} className="btn btn-primary">Back to Home</button>
      </div>
    </>
  )
}