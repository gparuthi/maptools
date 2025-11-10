import { useEffect, useState } from "react"
import { API_LATENCY, geocodeAPIKey } from "../config"
import fetchPlace from "../geocode"
import { Place } from "../types"

const usePlaces = (initialAddresses: string[]) => {
  const [addresses, setAddresses] = useState<string[]>(initialAddresses)
  const [places, setPlaces] = useState<Place[]>([])

  useEffect(() => {
    if (!addresses.length) {
      return
    }

    if (!geocodeAPIKey) {
      console.warn(
        "Cannot fetch places without VITE_GOOGLE_MAPS_API_KEY configured."
      )
      return
    }

    const timeout = setTimeout(async () => {
      const [address, title] = addresses[0].split(" | ")
      try {
        const place = await fetchPlace(address, title, geocodeAPIKey)
        setPlaces((current) => [...current, place])
      } catch (error) {
        console.error(error)
      } finally {
        setAddresses((current) => current.slice(1))
      }
    }, API_LATENCY)

    return () => {
      clearTimeout(timeout)
    }
  }, [addresses, geocodeAPIKey])

  return [places, setAddresses, setPlaces] as const
}

export default usePlaces
