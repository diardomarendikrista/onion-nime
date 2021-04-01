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
