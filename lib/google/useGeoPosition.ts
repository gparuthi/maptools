import React, { useState, useEffect } from "react"
import axios from "axios"

interface Response {
  lat: string
  lng: string
}
const useGeoPosition = (key: string, addresses: string[]) => {
  const [position, setPosition] = useState({ lat: null, lng: null })
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchLatandLng = async () => {
    try {
      setLoading(true)
      let requests = addresses.map((address) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
        return axios.get<Response>(url)
      })
      const responses = await axios.all(requests)
      console.log(responses)
      const result = responses[0].data
      if (result.lat !== null && result.lng !== null) {
        setPosition({ lat: result.lat, lng: result.lng })
      } else {
        setError(true)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(true)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLatandLng()
  }, [addresses])

  return [position, loading, error]
}

export default useGeoPosition
