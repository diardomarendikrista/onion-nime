export function addFavourite(payload) {
  return { type: 'favourite/addFavourite', payload }
}

export function setLoading(payload) {
  return { type: 'loading/setLoading', payload }
}

export function setError(payload) {
  return { type: 'error/setError', payload }
}
