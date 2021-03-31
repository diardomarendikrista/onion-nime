import {
  useParams,
  useHistory
} from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Loading from '../components/Loading'
import Error from '../components/Error'

export default function AnimeDetail () {
  const baseURL = 'https://kitsu.io/api/edge/anime';
  const { id } = useParams()
  const history = useHistory();

  const [anime, setAnime] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect( () => {
    setLoading(true);
    fetch(`${baseURL}/${id}`)
      .then(res => res.json())
      .then(res => {
        if (res.errors) {
          const err = res.errors
          throw err;
        } else {
          setAnime(res.data);
        }
      })
      .catch(err => {
        console.log(err);
        setError(true);
      })
      .finally( _ => {
        setLoading(false);
      })
  }, [id])

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };
    let format = new Date(date)
    return format.toLocaleString("en", options)
  }

  const checkCoverImage = () => {
    const url = anime.attributes.coverImage
    if ( url ) {
      return <img className="img-cover" src={JSON.stringify(url.large).split('"').join('')} alt="gambar" />
    } else {
      return <img className="img-cover" src="http://www.excavationsqueensland.com.au/wp-content/themes/excavation_queensland/img/no-banner.jpg" alt="gambar" />
    }
  }

  const goToHome = () => { 
    history.push('/')
  }

  if (loading) {
    return <Loading />
  } else if (error) {
    return <Error />
  } return (
    <Container>
      <div className="anime-detail">
        <div className="row">
          <div className="col">
            <center>
              <div className="">
                {checkCoverImage()}
                <div className="btn-detail">
                  <button className="btn btn-info">Add to Favourite</button><br/>
                  <button onClick={() => goToHome()} className="btn btn-info">Back to home</button>
                </div>
              </div>
            </center>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col img-detail-container text-center">
            <img className="img-detail" src={JSON.stringify(anime.attributes.posterImage.large).split('"').join('')} alt="gambar" />
          </div>
          <div className="col">
            <h1 className="text-center font-weight-bold">{JSON.stringify(anime.attributes.canonicalTitle).split('"').join('')}</h1>
            <p>Release date : {formatDate(JSON.stringify(anime.attributes.startDate).split('"').join(''))}</p>
            <p>Rating: {JSON.stringify(anime.attributes.averageRating).split('"').join('')}</p>
            <p>Synopsis : {JSON.stringify(anime.attributes.synopsis)}</p>
          </div>
        </div>
      </div>
    </Container>
  )
}