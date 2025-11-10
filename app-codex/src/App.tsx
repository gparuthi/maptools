import {
  Box,
  Divider,
  Flex,
  HStack,
  Link,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react"
import { useCallback } from "react"
import MapContainer from "./components/MapContainer"
import GithubIcon from "./components/GithubIcon"
import DebouncedTextArea from "./components/DebouncedTextArea"
import { DataExtractor } from "./components/DataExtractor"
import usePlaces from "./hooks/usePlaces"
import { geocodeAPIKey } from "./config"

const defaultExample = [
  "841 Gull Ave, Foster City | Audubon Elementary",
  "600 Alameda de las Pulgas, San Mateo | Baywood Elementary",
  "1058 Shell Blvd, Foster City | Beach Park Elementary",
].join("\n")

const App = () => {
  const [places, setAddresses, setPlaces] = usePlaces(defaultExample.split("\n"))

  const onTextChange = useCallback(
    (inputValue: string) => {
      const addressList = inputValue
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 4)
      setPlaces([])
      setAddresses(addressList)
    },
    [setAddresses, setPlaces]
  )

  return (
    <Box w="100vw">
      <Flex direction={{ base: "column", md: "row" }}>
        <Flex direction="column" flex={{ base: 1, md: 0.6 }} minH="100vh" p={6}>
          <Box>
            <Text as="strong">What is this tool?</Text>
            <Text mt={2}>
              Paste lines of text that contain addresses and map them instantly.
            </Text>
            <Text mt={2}>Examples:</Text>
            <List styleType="disc" ml={6} spacing={1} mt={2}>
              <ListItem>
                <Link href="https://sf.gov/vaccine-sites" isExternal>
                  SF Govt Vaccine Sites
                </Link>{" "}
                shows a list of vaccine sites.
              </ListItem>
              <ListItem>
                Interesting locations article like{" "}
                <Link
                  href="https://www.timeout.com/san-francisco/nightlife/best-nightclubs-in-san-francisco?itm_source=parsely-api"
                  isExternal
                >
                  this TimeOut roundup
                </Link>
                .
              </ListItem>
            </List>
          </Box>
          <Divider my={6} />
          <Box flex={1}>
            <Text mb={4} fontWeight="bold">
              Extract addresses from a webpage
            </Text>
            <DataExtractor onDone={onTextChange} />
          </Box>
          <Divider my={6} />
          <Box flex={1} display="flex" flexDirection="column" gap={4}>
            <Text fontWeight="bold">Paste addresses manually</Text>
            <DebouncedTextArea initText={defaultExample} onChange={onTextChange} />
          </Box>
          <HStack mt={6}>
            <Box w={10}>
              <Link href="https://github.com/gparuthi/maptools" isExternal>
                <GithubIcon />
              </Link>
            </Box>
          </HStack>
        </Flex>
        <Box flex={1} borderWidth={1}>
          <MapContainer apiKey={geocodeAPIKey} places={places} />
        </Box>
      </Flex>
    </Box>
  )
}

export default App
