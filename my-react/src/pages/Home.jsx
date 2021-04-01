import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import AnimeCard from '../components/AnimeCard.jsx'
import SearchForm from '../components/SearchForm.jsx'
import ButtonPage from '../components/ButtonPage.jsx'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Container } from 'react-bootstrap';

import {
  setBaseURL,
} from '../store/actions/page'

import {
  setAnimeListAsync
} from '../store/actions/anime'


export default function Home () {
  const animeList = useSelector(state => state.anime.animeList);
  const defaultURL = useSelector(state => state.page.defaultURL);
  const baseURL = useSelector(state => state.page.baseURL);
  const loading = useSelector(state => state.page.loading);
  const error = useSelector(state => state.page.error);
  const page = useSelector(state => state.page.page);
  const dispatch = useDispatch(); 

  useEffect( _ => {
    document.title = 'OnioNime';
  }, [])

  useEffect( () => {
    dispatch(setAnimeListAsync(baseURL));
  // eslint-disable-next-line
  }, [baseURL])

  const pageLimit = (location) => {
    //
  }

  const changePage = (destinationPage) => {
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
          animeList.length < 1 && !loading ? animeListEmpty() :
          animeList.map(anime => (
            <AnimeCard anime={anime} key={anime.id} />
          ))
        }
      </div>
      { animeList.length > 0 && !loading && !error ? <ButtonPage changePage={changePage} /> : ''}
    </Container>
  )
}
