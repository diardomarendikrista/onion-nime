const initialState = {
  animeFavourite: [],
  loading: true,
  error: false,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  let newFavourite = [];
  if (type === "favourite/getFavourite") {
    newFavourite = JSON.parse(localStorage.getItem("favourite"));
    return { ...state, animeFavourite: newFavourite };
  }
  if (type === "favourite/addFavourite") {
    newFavourite = state.animeFavourite.concat(payload);
    localStorage.setItem("favourite", JSON.stringify(newFavourite));
    return { ...state, animeFavourite: newFavourite };
  }
  if (type === "favourite/deleteFavourite") {
    newFavourite = state.animeFavourite.filter(
      (item) => item.id !== payload.id
    );
    localStorage.setItem("favourite", JSON.stringify(newFavourite));
    return { ...state, animeFavourite: newFavourite };
  }
  if (type === "loading/setLoading") return { ...state, loading: payload };
  if (type === "error/setError") return { ...state, error: payload };
  return state;
}
