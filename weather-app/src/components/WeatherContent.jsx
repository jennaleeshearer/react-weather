export default function WeatherContent(props) {
  const data = props?.data
  const regionName = props?.regionName
  const weatherImg = props?.weatherImg

  if (!data || !data.current || !data.daily) {
    return <div>
      No data found.
    </div>
  }

  return (
    <div className="px-5 mx-5">
      <div className="row w-100">
        <div className="col-6 ps-5">
          <div className="d-flex pb-4">
            <i className="bi bi-geo-alt me-2"></i>
            {regionName || "Location Name"}
          </div>
          <h1 className="mt-3">{data.current.temperature_2m}°C</h1>
        </div>
        <div className="col-6 d-flex flex-column justify-conent-center align-items-center">
          {weatherImg && <img src={weatherImg} alt="Weather" width={"130px"} className="mt-4" />}
        </div>
      </div>
      <div className="d-flex mt-5">
        <div className="badge rounded-pill bg-secondary me-3 d-flex align-items-center justify-content-center flex-grow-1">
          <i className="bi bi-wind me-2 h5 my-0"></i>
          <h5 className="m-0">{data.current.wind_speed_10m} m/s</h5>
        </div>

        <div className="badge rounded-pill bg-secondary me-3 d-flex align-items-center justify-content-center flex-grow-1">
          <i className="bi bi-cloud-drizzle me-2 h5 my-0"></i>
          <h5 className="m-0">{data.current.rain} mm</h5>
        </div>

        <div className="badge rounded-pill bg-secondary me-3 d-flex align-items-center justify-content-center flex-grow-1">
          <i className="bi bi-snow me-2 h5 my-0"></i>
          <h5 className="m-0">{data.daily.snowfall_sum[0]} %</h5>
        </div>
      </div>
    </div>
  )
}
