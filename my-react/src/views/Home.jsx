import React, { useEffect, useState } from 'react'
import AnimeDetail from '../components/AnimeDetail.jsx'
import TitleBar from '../components/TitleBar.jsx'
import ButtonPage from '../components/ButtonPage.jsx'
import { Container } from 'react-bootstrap';

export default function Home () {
  const [defaultURL] = useState('https://kitsu.io/api/edge/anime?page%5Blimit%5D=12');
  const [baseURL, setBaseURL] = useState('https://kitsu.io/api/edge/anime?page%5Blimit%5D=12');
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState({});

  function changePage (destinationPage) {
    switch (destinationPage) {  
      case 'first':
        if (!page.first) console.log(`Page Doesn't Exist`);
        else setBaseURL(page.first);
        break;
      case 'prev':
        if (!page.prev) console.log(`Page Doesn't Exist`);
        else setBaseURL(page.prev);
        break;
      case 'next':
        if (!page.next) console.log(`Page Doesn't Exist`);
        else setBaseURL(page.next);
        break;
      case 'last':
        if (!page.last) console.log(`Page Doesn't Exist`);
        else setBaseURL(page.last);
        break;
      default:
        break;
    }
  }

  function search (search) {
    if (search) {
      const keywords = search.split(' ').join('%20')
      const url = `https://kitsu.io/api/edge/anime?filter[text]=${keywords}&page%5Blimit%5D=12`;
      setBaseURL(url)
    } else {
      setBaseURL(defaultURL)
    }
  }

  useEffect( () => {
      setAnimeList([]);
      setLoading(true);
      fetch(`${baseURL}`)
        .then(res => res.json())
        .then(res => {
          setAnimeList(res.data);
          setPage(res.links);
        })
        .catch(err => {
          console.log(err);
          setError(true);
        })
        .finally( _ => {
          setLoading(false);
        })
  }, [baseURL])

  return (
    <Container className="text-center">
      <TitleBar search={search}/>
      { !loading && !error ? <ButtonPage changePage={changePage} /> : ''}
      <div>
        {loading ? <img className="loading" src="https://darkiemindyou.files.wordpress.com/2015/04/loading6_230x230-cooler.gif" alt="loading"></img> : ''}
        {error ? <img className="loading" src="https://media.tenor.com/images/b276eb1262c2ae17a7d94929051d7a9d/tenor.gif" alt="error loading"/> : ''}
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {
          animeList.map(anime => (
            <AnimeDetail anime={anime} key={anime.id} />
          ))
        }
      </div>
      { !loading && !error ? <ButtonPage changePage={changePage} /> : ''}
    </Container>
  )
}
