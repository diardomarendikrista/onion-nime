import React from 'react'
import Error from '../assets/error.gif'

export default function Loading () {

  return (
    <>
      <div className="loading">
        <img src={Error} alt="error server"/>
      </div>
      <div className="loading-home-btn text-center">
        <h3>500 Internal Server Error</h3>
      </div>
    </>
  )
}