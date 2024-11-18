const setCoordinates = (coordinates) => {
  const c = coordinates.split(", ")

  let latitude = parseFloat(c[0])
  let longitude = parseFloat(c[1])

  console.log(longitude, latitude)
  return { longitude, latitude }
}

export default setCoordinates
