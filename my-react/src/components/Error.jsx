import {
  useHistory
} from "react-router-dom";
import React from 'react'

export default function Loading () {
  const history = useHistory();

  const goToHome = () => { 
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