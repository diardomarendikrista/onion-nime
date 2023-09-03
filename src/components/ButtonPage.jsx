import React from 'react'
import { Button } from 'react-bootstrap';

export default function buttonPage (props) {
  function page (page) {
    props.changePage(page);
  }

  return (
    <div className="btn-group">
      <Button style={{"fontSize":"12px"}} variant="info" onClick={() => page('first')}>First</Button>
      <Button style={{"fontSize":"12px"}} variant="info" onClick={() => page('prev')}>&lt;&lt; Prev</Button>
      <Button style={{"fontSize":"12px"}} variant="info" onClick={() => page('next')}>Next &gt;&gt;</Button>
      <Button style={{"fontSize":"12px"}} variant="info" onClick={() => page('last')}>Last</Button>
    </div>
  )
}