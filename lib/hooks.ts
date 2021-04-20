import { useEffect, useState } from "react"
import { API_LATENCY, geocodeAPIKey } from "./config"
import fetchPlace from "./geocode"
import { Place } from "./types"

export const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedQuery] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(value)
    }, 2000)
    return () => {
      clearTimeout(handler)
    }
  }, [value])

  return debouncedValue
}

export const usePlaces = (initAddresses) => {
  const [addresses, setAddresses] = useState<string[]>(initAddresses)
  const [places, setPlaces] = useState<Place[]>([])

  useEffect(() => {
    const timer = setInterval(async () => {
      // pop address and add the place to places
      const q = [...addresses]
      if (q.length) {
        const [address, title] = q.pop().split(" | ")
        try {
          const place = await fetchPlace(address, title, geocodeAPIKey)
          setPlaces([...places, place])
        } catch (error) {
          console.error(error)
        }

        setAddresses([...q])
      }
    }, API_LATENCY)
    return () => {
      clearTimeout(timer)
    }
  }, [addresses])

  return [places, setAddresses, setPlaces] as const
}
