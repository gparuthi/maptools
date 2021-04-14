import { Box, Flex } from "@chakra-ui/layout"
import { Textarea } from "@chakra-ui/textarea"
import { useEffect, useState } from "react"
import MapContainer from "../lib/MapContainer"

export interface Coords {
  lat: number
  lng: number
}

export interface Place {
  coords: Coords
  title?: string
}

const place: Place = {
  coords: { lat: 10, lng: 40 }, // required: latitude & longitude at which to display the marker
  title: `Life, the Universe and Everything`, // optional
}
const initAddresses = ["3338 Valencia St, San Francisco"]

const Home = () => {
  const [addresses, setAddresses] = useState(initAddresses)
  const [places, setPlaces] = useState([])
  const [geocodeAPIKey, setGeocodeAPIKey] = useState(
    "AIzaSyDtKEsYNpwrVl5Xqhibq2lqt_nHNbfyLgc"
  )
  const fetchPlace = (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${geocodeAPIKey}`
    return fetch(url)
  }
  useEffect(() => {
    addresses.forEach(async (address) => {
      const res = await fetchPlace(address)
      const data = await res.json()
      const allResults = data.results
      console.log(allResults[0])
      const place: Place = {
        coords: allResults[0].geometry.location,
        title: allResults[0].formatted_address,
      }
      setPlaces([...places, place])
    })
  }, [])

  return (
    <Box w="vw">
      <Flex direction="row">
        <Box flex={0.6}>
          <Textarea placeholder="Enter address lines here" h="100vh"></Textarea>
        </Box>
        <Box flex={1} border="4px">
          <MapContainer places={places} />
        </Box>
      </Flex>
    </Box>
  )
}

export default Home
