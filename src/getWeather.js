const getWeather = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error.message)
    return null
  }
}

export default getWeather
