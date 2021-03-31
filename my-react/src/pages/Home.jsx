import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import AnimeCard from '../components/AnimeCard.jsx'
import SearchForm from '../components/SearchForm.jsx'
import ButtonPage from '../components/ButtonPage.jsx'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Container } from 'react-bootstrap';

import {
  setAnimeList,
  setAnime,
  setLoading,
  setError,
  setBaseURL,
  setPage
} from '../store/actions'


export default function Home () {
  const defaultURL = useSelector(state => state.defaultURL);
  const baseURL = useSelector(state => state.baseURL);
  const animeList = useSelector(state => state.animeList);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);
  const page = useSelector(state => state.page);

  const dispatch = useDispatch(); 

  useEffect( _ => {
    document.title = 'OnioNime';
  }, [])

  useEffect( () => {
    dispatch(setLoading(true));
    dispatch(setAnimeList([]));

    fetch(`${baseURL}`)
      .then(res => res.json())
      .then(anime => {
        dispatch(setPage(anime.links));
        dispatch(setAnimeList(anime.data));
        dispatch(setAnime(anime.data[0]));
      })
      .catch(err => {
        console.log(err);
        dispatch(setError(true));
      })
      .finally( _ => {
        dispatch(setLoading(false));
      })
  // eslint-disable-next-line
  }, [baseURL])

  function changePage (destinationPage) {
    switch (destinationPage) {  
      case 'first':
        if (!page.first) console.log(`Page Doesn't Exist`);
        else dispatch(setBaseURL(page.first));
        break;
      case 'prev':
        if (!page.prev) console.log(`Page Doesn't Exist`);
        else dispatch(setBaseURL(page.prev));
        break;
      case 'next':
        if (!page.next) console.log(`Page Doesn't Exist`);
        else dispatch(setBaseURL(page.next));
        break;
      case 'last':
        if (!page.last) console.log(`Page Doesn't Exist`);
        else dispatch(setBaseURL(page.last));
        break;
      default:
        break;
    }
  }

  function search (search) {
    if (search) {
      const keywords = search.split(' ').join('%20')
      const url = `https://kitsu.io/api/edge/anime?filter[text]=${keywords}&page%5Blimit%5D=12`;
      dispatch(setBaseURL(url))
    } else {
      dispatch(setBaseURL(defaultURL))
    }
  }

  return (
    <Container className="text-center">
      <SearchForm search={search}/>
      { !loading && !error ? <ButtonPage changePage={changePage} /> : ''}
      <div>
        {loading ? <Loading /> : ''}
        {error ?  <Error /> : ''}
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {
          animeList.map(anime => (
            <AnimeCard anime={anime} key={anime.id} />
          ))
        }
      </div>
      { !loading && !error ? <ButtonPage changePage={changePage} /> : ''}
    </Container>
  )
}
