const initialState = {
  animeList: [],
  anime: {}
}

export default function reducer (state = initialState, action) {
  const { type, payload } = action;
  if (type === "animeList/setAnimeList") return { ...state, animeList: payload }
  if (type === "anime/setAnime") return { ...state, anime: payload }
  return state;
}