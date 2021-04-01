import {
  setLoading,
  setError,
  setPage
} from './page'

export function setAnimeList(payload) {
  return { type: 'animeList/setAnimeList', payload}
}

export function setAnime(payload) {
  return { type: 'anime/setAnime', payload}
}

export function setAnimeListAsync(baseURL) {
  return (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setAnimeList([]));
  
    fetch(baseURL)
      .then(res => res.json())
      .then(anime => {
        dispatch(setAnimeList(anime.data));
        dispatch(setAnime(anime.data[0]));
        dispatch(setPage(anime.links));
      })
      .catch(err => {
        console.log(err);
        dispatch(setError(true));
      })
      .finally(_ => {
        dispatch(setLoading(false));
      })
  }
}

export function setAnimeAsync(url) {
  return(dispatch) => {
    dispatch(setLoading(true))

    fetch(url)
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
  }
}