import React from 'react'
import { Button, Form } from 'react-bootstrap';

class SearchForm extends React.Component {
  constructor () {
    super ()

    this.state = {
      search: ''
    }
  }

  formOnSubmit(event) {
    event.preventDefault()
    this.props.search(this.state.search);


    this.setState({
      ...this.state,
      search: ''
    })
  }

  handleOnChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    })
  }

  render () {
    return (
      <>
        <form onSubmit={(event) => this.formOnSubmit(event)}>
          <Form.Control
            type="text"
            placeholder="Search your anime , eg: Markuto"
            name="search"
            value={this.state.search}
            onChange={this.handleOnChange}
            style={{"width":"80%", display:"inline"}}
          />
          <Button style={{"width":"15%"}} type="submit">search</Button>
        </form>
      </>
    )
  }
}

export default SearchForm