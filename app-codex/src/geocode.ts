import { Place } from "./types"

const fetchPlace = async (
  address: string,
  title: string | undefined,
  apiKey: string
): Promise<Place> => {
  const encodedAddress = encodeURIComponent(address)
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Geocode request failed for "${address}" (${res.status})`)
  }

  const data = await res.json()
  const topResult = data.results?.[0]

  if (!topResult) {
    throw new Error(`No geocode results for "${address}"`)
  }

  return {
    id: topResult.place_id,
    location: topResult.geometry.location,
    address: topResult.formatted_address,
    title,
  }
}

export default fetchPlace
