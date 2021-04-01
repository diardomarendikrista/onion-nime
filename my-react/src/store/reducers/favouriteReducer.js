const initialState = {
  animeFavourite: []
}

export default function reducer (state = initialState, action) {
  const { type, payload } = action;
  if (type === "favourite/addFavourite") return { ...state, animeFavourite: state.animeFavourite.concat(payload) }
  return state;
}