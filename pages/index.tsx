import { Image } from "@chakra-ui/image"
import { Input } from "@chakra-ui/input"
import { HStack } from "@chakra-ui/layout"
import { Box, Flex, Stack } from "@chakra-ui/layout"
import { Textarea } from "@chakra-ui/textarea"
import { useEffect, useState } from "react"
import fetchPlace from "../lib/geocode"
import { GithubIcon } from "../lib/Icons"
import MapContainer from "../lib/MapContainer"
import { DataExtractor } from "./extract"

const API_LATENCY = 2000

const Home = () => {
  const [addresses, setAddresses] = useState([])
  const [places, setPlaces] = useState([])
  const geocodeAPIKey = "AIzaSyBW4H_d7n2mhJreDkuWHfrJRpy59V-drIc"

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

  const onTextChange = (inputValue: string) => {
    const addressList = inputValue.split("\n").filter((s) => s.length > 4)
    setPlaces([])
    setAddresses(addressList)
  }

  return (
    <Box w="vw">
      <Flex direction="row">
        <Flex direction="column" flex={0.6} h="100vh">
          <Box flex={1}>
            <DataExtractor onDone={onTextChange} />
          </Box>

          <HStack flex={0.1}>
            <Box w={10}>
              <a href="https://github.com/gparuthi/maptools">
                <GithubIcon />
              </a>
            </Box>
          </HStack>
        </Flex>
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
