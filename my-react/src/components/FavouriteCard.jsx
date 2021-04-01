import React from 'react'
import { Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import setStar from '../helpers/hooks/setStar';

export default function AnimeDetail (props) {
  const { anime } = props;
  const history = useHistory();

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };
    let format = new Date(date)
    return format.toLocaleString("en", options)
  }

  const toDetail = (id) => {
    history.push(`/anime/${id}`)
  }

  return (
    <>
      <Card className="card m-1" style={{ width: '16rem' }}>
        <div className="card-img-zoom">
          <Card.Img onClick={() => toDetail(anime.id)} className="card-img" variant="top" src={anime.attributes.posterImage.medium} />
        </div>
        <Card.Body>
          <Card.Title onClick={() => toDetail(anime.id)} className="card-title">{ anime.attributes.canonicalTitle }</Card.Title>
          <Card.Text className="card-text">
            Release Date : { formatDate(anime.attributes.startDate) } <br/>
            Status : { anime.attributes.status } <br/>
            Rating : { !anime.attributes.averageRating ? '-' : anime.attributes.averageRating } { setStar(anime.attributes.averageRating) }
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

