export const getRandomInt = (max) => {
  if (isNaN(max)) {
    return -1
  }

  return Math.floor(Math.random() * Math.floor(max))
}
