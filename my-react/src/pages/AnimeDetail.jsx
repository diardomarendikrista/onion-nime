import { useParams, useHistory } from "react-router-dom";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Swal from 'sweetalert2'

import {
  setLoading,
  setError,
  setAnime,
  addFavourite
} from '../store/actions'

export default function AnimeDetail () {
  const baseURL = 'https://kitsu.io/api/edge/anime';
  const { id } = useParams()
  const history = useHistory();
  const dispatch = useDispatch();

  const anime = useSelector(state => state.anime);
  const animeFavourite = useSelector(state => state.animeFavourite);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
  
  useEffect( () => {
    dispatch(setLoading(true))

    fetch(`${baseURL}/${id}`)
      .then(res => res.json())
      .then(res => {
        if (res.errors) {
          const err = res.errors
          throw err;
        } else {
          dispatch(setAnime(res.data))
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(setError(true))
      })
      .finally( _ => {
        dispatch(setLoading(false))
      })
  // eslint-disable-next-line
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
    const url = anime.attributes.coverImage;
    if ( url ) {
      return <img className="img-cover" src={JSON.stringify(url.large).split('"').join('')} alt="gambar" />
    } else {
      return <img className="img-cover" src="http://www.excavationsqueensland.com.au/wp-content/themes/excavation_queensland/img/no-banner.jpg" alt="gambar" />
    }
  }

  const goToHome = () => { 
    history.goBack()
  }

  const goToFavourite = () => {
    history.push('/favourites')
  }

  const setFavourite = (anime) => {
    let alreadyFavourited = animeFavourite.find(favourite => favourite.id === anime.id)
    if (!alreadyFavourited) {
      dispatch(addFavourite(anime));
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `"${anime.attributes.canonicalTitle}" added to your favourites!`
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `"${anime.attributes.canonicalTitle}" is already on your favourites!`
      })
    }
  }

  const setButton = (id) => {
    const alreadyFavourited = animeFavourite.find(favourite => favourite.id === anime.id)
    if (alreadyFavourited) return <button onClick={() => goToFavourite()} className="btn btn-danger">Favourited &#10003;</button>;
    else return <button onClick={() => setFavourite(anime)} className="btn btn-primary">Add to Favourite</button>
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
                  {setButton(anime.id)}
                  <button onClick={() => goToHome()} className="btn btn-info">Back to list</button>
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