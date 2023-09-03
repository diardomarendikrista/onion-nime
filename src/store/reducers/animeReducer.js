const initialState = {
  defaultURL: "https://kitsu.io/api/edge/anime?page%5Blimit%5D=12",
  baseURL: "https://kitsu.io/api/edge/anime?page%5Blimit%5D=12",
  detailURL: "https://kitsu.io/api/edge/anime/",
  page: {},
  animeList: [],
  anime: {},
  loading: true,
  error: false
}

export default function reducer (state = initialState, action) {
  const { type, payload } = action;
  if (type === "animeList/setAnimeList") return { ...state, animeList: payload }
  if (type === "anime/setAnime") return { ...state, anime: payload }
  if (type === "baseURL/setBaseURL") return { ...state, baseURL: payload }
  if (type === "page/setPage") return { ...state, page: payload }
  if (type === "loading/setLoading") return { ...state, loading: payload }
  if (type === "error/setError") return { ...state, error: payload }
  return state;
}
