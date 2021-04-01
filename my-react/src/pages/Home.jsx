import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from 'react-bootstrap';
import Swal from 'sweetalert2';

import {
  AnimeCard,
  SearchForm,
  ButtonPage,
  Loading,
  Error
} from '../components'

import {
  setBaseURL,
  setAnimeListAsync
} from '../store/actions/anime'


export default function Home () {
  const animeList = useSelector(state => state.anime.animeList);
  const defaultURL = useSelector(state => state.anime.defaultURL);
  const baseURL = useSelector(state => state.anime.baseURL);
  const loading = useSelector(state => state.anime.loading);
  const error = useSelector(state => state.anime.error);
  const page = useSelector(state => state.anime.page);
  const dispatch = useDispatch(); 

  useEffect( _ => {
    document.title = 'OnioNime';
  }, [])

  useEffect( () => {
    dispatch(setAnimeListAsync(baseURL));
  // eslint-disable-next-line
  }, [baseURL])

  const pageLimit = (location) => {
    Swal.fire({
      icon: 'info',
      text: `You are already on ${location}`,
    })
  }

  const changePage = (destinationPage) => {
    switch (destinationPage) {  
      case 'first':
        if (!page.first) pageLimit('first page')
        else dispatch(setBaseURL(page.first));
        break;
      case 'prev':
        if (!page.prev) pageLimit('first page')
        else dispatch(setBaseURL(page.prev));
        break;
      case 'next':
        if (!page.next) pageLimit('last page')
        else dispatch(setBaseURL(page.next));
        break;
      case 'last':
        if (!page.last) pageLimit('last page')
        else dispatch(setBaseURL(page.last));
        break;
      default:
        break;
    }
  }

  const search = (search) => {
    if (search) {
      const keywords = search.split(' ').join('%20')
      const url = `https://kitsu.io/api/edge/anime?filter[text]=${keywords}&page%5Blimit%5D=12`;
      dispatch(setBaseURL(url))
    } else {
      dispatch(setBaseURL(defaultURL))
    }
  }

  const animeListEmpty = () => {
      return (
      <div className="favourite-empty text-center">
        <h2 className="text-secondary">Oh noo...</h2>
        <h3 className="text-secondary">Your anime is not found</h3>
        <button onClick={() => dispatch(setBaseURL(defaultURL))} className="btn btn-outline-secondary">See All Anime</button>
      </div>
    )
  }

  return (
    <Container className="text-center">
      <SearchForm search={search}/>
      { animeList.length > 0 && !loading && !error ? <ButtonPage changePage={changePage} /> : ''}
      <div>
        {loading ? <Loading /> : ''}
        {error ?  <Error /> : ''}
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {
          animeList.length < 1 && !loading && !error ? animeListEmpty() :
          animeList.map(anime => (
            <AnimeCard anime={anime} key={anime.id} />
          ))
        }
      </div>
      { animeList.length > 0 && !loading && !error ? <ButtonPage changePage={changePage} /> : ''}
    </Container>
  )
}
