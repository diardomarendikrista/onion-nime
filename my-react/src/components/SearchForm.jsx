import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';

export default function SearchForm (props) {
  const [search, setSearch] = useState('');

  function formOnSubmit(event) {
    event.preventDefault();
    props.search(search);
    setSearch('');
  }

  function handleOnChange (event) {
    setSearch(event.target.value);
  }

  return (
    <>
      <form onSubmit={(event) => formOnSubmit(event)}>
        <div className="search-box">
          <Form.Control
            type="text"
            placeholder="Search your anime , eg: Markuto"
            name="search"
            value={search}
            onChange={handleOnChange}
          />
          <Button className='btn-search' type="submit">search</Button>
        </div>
      </form>
    </>
  )
}