export function setAnimeList(payload) {
  return { type: 'animeList/setAnimeList', payload}
}

export function setAnime(payload) {
  return { type: 'anime/setAnime', payload}
}

export function setBaseURL(payload) {
  return { type: 'baseURL/setBaseURL', payload }
}

export function setPage(payload) {
  return { type: 'page/setPage', payload }
}

export function setLoading(payload) {
  return { type: 'loading/setLoading', payload }
}

export function setError(payload) {
  return { type: 'error/setError', payload }
}

export function addFavourite(payload) {
  return { type: 'favourite/addFavourite', payload }
}

export function deleteFavourite(payload) {
  return { type: 'favourite/addFavourite', payload }
}