import React, { useState, useEffect } from "react"
import axios from "axios"

const useGeoPosition = (key, address) => {
  const [position, setPosition] = useState({ lat: null, lng: null })
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchLatandLng = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
      )
      const result = res.data.results[0].geometry.location

      if (result.lat !== null && result.lng !== null) {
        setPosition({ lat: result.lat, lng: result.lng })
      } else {
        setError(true)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }

  useEffect(() => {
    fetchLatandLng()
  }, [address])

  return [position, loading, error]
}

export default useGeoPosition
