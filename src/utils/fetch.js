export const handleResponse = (response) => {
  if (response.ok) {
    return response.json()
  }

  throw new Error(response.statusText)
}
