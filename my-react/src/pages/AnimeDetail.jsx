import { useParams, useHistory } from "react-router-dom";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import Loading from '../components/Loading';
import Error from '../components/Error';
import setStar from '../helpers/hooks/setStar';
import Swal from 'sweetalert2';

import { addFavourite } from '../store/actions/favourite'
import { setAnimeAsync } from '../store/actions/anime'

export default function AnimeDetail () {
  const { id } = useParams()
  const history = useHistory();
  const dispatch = useDispatch();
  
  const detailURL = useSelector(state => state.page.detailURL);
  const anime = useSelector(state => state.anime.anime);
  const animeFavourite = useSelector(state => state.favourite.animeFavourite);
  const loading = useSelector(state => state.page.loading);
  const error = useSelector(state => state.page.error);

  useEffect( _ => {
    document.title = 'OnioNime - Detail';
  }, [])
  
  useEffect( () => {
    dispatch(setAnimeAsync(detailURL+id));
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
    Swal.fire({
      title: 'Anime already on your favourite',
      text: 'Go to favourite page?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#00a4b6',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Go to favourite page'
    }).then((result) => {
      if (result.isConfirmed) {
        history.push('/favourites')
      }
    })
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
        <div className="detail-info">
          <div className="col img-detail-container text-center">
            <img className="img-detail" src={JSON.stringify(anime.attributes.posterImage.large).split('"').join('')} alt="gambar" />
          </div>
          <div className="col">
            <h1 className="text-center font-weight-bold mb-4">{JSON.stringify(anime.attributes.canonicalTitle).split('"').join('')}</h1>
            <p>Release date : {formatDate(JSON.stringify(anime.attributes.startDate).split('"').join(''))}</p>
            <p>Rating : {JSON.stringify(anime.attributes.averageRating).split('"').join('')} {setStar(JSON.stringify(anime.attributes.averageRating).split('"').join(''))}</p>
            <p>Synopsis : {JSON.stringify(anime.attributes.synopsis)}</p>
          </div>
        </div>
      </div>
    </Container>
  )
}