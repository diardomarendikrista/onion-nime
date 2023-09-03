const initialState = {
  animeFavourite: [],
  loading: true,
  error: false
}

export default function reducer (state = initialState, action) {
  const { type, payload } = action;
  if (type === "favourite/addFavourite") return { ...state, animeFavourite: state.animeFavourite.concat(payload) }
  if (type === "loading/setLoading") return { ...state, loading: payload }
  if (type === "error/setError") return { ...state, error: payload }
  return state;
}