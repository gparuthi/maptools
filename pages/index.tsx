import { Input } from "@chakra-ui/input"
import { Box, Flex } from "@chakra-ui/layout"
import { Textarea } from "@chakra-ui/textarea"
import { useEffect, useState } from "react"
import fetchPlace from "../lib/geocode"
import MapContainer from "../lib/MapContainer"

const Home = () => {
  const [addresses, setAddresses] = useState([])
  const [places, setPlaces] = useState([])
  const [geocodeAPIKey, setGeocodeAPIKey] = useState()

  useEffect(() => {
    const timer = setInterval(async () => {
      // pop address and add the place to places
      const q = [...addresses]
      console.log(q.length)
      if (q.length) {
        const address = q.pop()
        const place = await fetchPlace(address, geocodeAPIKey)
        setPlaces([...places, place])
        setAddresses([...q])
      }
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [addresses])

  const onTextChange = (e) => {
    let inputValue: string = e.target.value
    const addressList = inputValue.split("\n").filter((s) => s.length > 4)
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
          <Input placeholder="API key" onChange={onKeyChange} />
          <Textarea
            placeholder="Enter address lines here"
            h="100vh"
            onChange={onTextChange}
          ></Textarea>
        </Box>
        <Box flex={1} border="4px">
          {geocodeAPIKey && (
            <MapContainer API_Key={geocodeAPIKey} array={places} />
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default Home
