import React from 'react'
import { Card, Button } from 'react-bootstrap';

export default function AnimeDetail (props) {
  const { anime } = props;

  function formatDate (date) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };
    let format = new Date(date)
    return format.toLocaleString("en", options)
  }

  return (
    <>
      <Card className="card m-1" style={{ width: '16rem' }}>
        <div className="card-img-zoom">
          <Card.Img className="card-img" variant="top" src={anime.attributes.posterImage.medium} />
        </div>
        <Card.Body>
          <Card.Title className="card-title">{ anime.attributes.canonicalTitle }</Card.Title>
          <Card.Text className="card-text">
            Release Date : { formatDate(anime.attributes.startDate) } <br/>
            Status : { anime.attributes.status } <br/>
            Avg Rating : { !anime.attributes.averageRating ? '-' : anime.attributes.averageRating }
          </Card.Text>
          <Button className="btn-favourite" variant="primary">Favourite</Button>
        </Card.Body>
      </Card>
    </>
  )
}

