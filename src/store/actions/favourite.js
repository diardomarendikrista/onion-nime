export function getFavourite(payload) {
  return { type: "favourite/getFavourite", payload };
}

export function addFavourite(payload) {
  return { type: "favourite/addFavourite", payload };
}

export function deleteFavourite(payload) {
  return { type: "favourite/deleteFavourite", payload };
}

export function setLoading(payload) {
  return { type: "loading/setLoading", payload };
}

export function setError(payload) {
  return { type: "error/setError", payload };
}
