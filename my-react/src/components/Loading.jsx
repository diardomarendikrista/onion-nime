import React from 'react'
import LoadingGif from '../assets/loading.gif'

export default function Loading () {
  return (
    <img className="loading" src={LoadingGif} alt="loading" />
  )
}