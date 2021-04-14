import { Input } from "@chakra-ui/input"
import { Box, Flex } from "@chakra-ui/layout"
import { Textarea } from "@chakra-ui/textarea"
import { useEffect, useState } from "react"
import fetchPlace from "../lib/google/geocode"
import MapContainer from "../lib/MapContainer"

const Home = () => {
  const [addresses, setAddresses] = useState([])
  const [places, setPlaces] = useState([])
  const [geocodeAPIKey, setGeocodeAPIKey] = useState()

  useEffect(() => {
    Promise.all(
      addresses.map((address) => fetchPlace(address, geocodeAPIKey))
    ).then((places) => {
      setPlaces(places)
      console.log(places)
    })
  }, [addresses])

  const onTextChange = (e) => {
    let inputValue: string = e.target.value
    const addressList = inputValue
      .split("\n")
      .filter((s) => s.length > 4)
      // .slice(0, 4)
    console.log(addressList)
    setPlaces([])
    setAddresses(addressList)
  }
  const onKeyChange = (e) => {
    setGeocodeAPIKey(e.target.value)
  }

  return (
    <Box w="vw">
      <Flex direction="row">
        <Box flex={0.6}>
          <Input placeholder="API key" onChange={onKeyChange}/>
          <Textarea
            placeholder="Enter address lines here"
            h="100vh"
            onChange={onTextChange}
          ></Textarea>
        </Box>
        <Box flex={1} border="4px">
          <MapContainer API_Key={geocodeAPIKey} array={places} />
        </Box>
      </Flex>
    </Box>
  )
}

export default Home
