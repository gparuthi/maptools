import { Place } from "./types"

const fetchPlace = async (address, title, geocodeAPIKey) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${geocodeAPIKey}`
  const res = await fetch(url)
  const data = await res.json()
  const topResult = data.results[0]
  console.log(title, address, topResult)
  const place: Place = {
    id: topResult.place_id,
    location: topResult.geometry.location,
    address: topResult.formatted_address,
    title,
  }
  return place
}

export default fetchPlace
