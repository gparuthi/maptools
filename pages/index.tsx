import { Image } from "@chakra-ui/image"
import { Input } from "@chakra-ui/input"
import { HStack } from "@chakra-ui/layout"
import { Box, Flex, Stack } from "@chakra-ui/layout"
import { Textarea } from "@chakra-ui/textarea"
import { useEffect, useState } from "react"
import fetchPlace from "../lib/geocode"
import { GithubIcon } from "../lib/Icons"
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
        const [address, title] = q.pop().split(" | ")
        try {
          const place = await fetchPlace(address, title, geocodeAPIKey)
          setPlaces([...places, place])
        } catch (error) {
          console.error(error)
        }

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
        <Flex direction="column" flex={0.6} h="100vh">
          <Input
            flex={0.1}
            placeholder="Google Cloud API key"
            onChange={onKeyChange}
          />
          <Textarea
            flex={1}
            placeholder="Enter address lines here"
            onChange={onTextChange}
          ></Textarea>
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
