import { Box, Flex, HStack } from "@chakra-ui/layout"
import { geocodeAPIKey } from "../lib/config"
import DebouncedTextArea from "../lib/DebouncedTextArea"
import { usePlaces } from "../lib/hooks"
import { GithubIcon } from "../lib/Icons"
import MapContainer from "../lib/MapContainer"

const Home = () => {
  const initAddresses = ["golden gate bridge", "alcatraz", "fort mason"]
  const [places, setAddresses, setPlaces] = usePlaces(initAddresses)

  const onTextChange = (debouncedText: string) => {
    const addressList = debouncedText
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 4)
    // .slice(0, 4)
    console.log(addressList)
    setPlaces([])
    setAddresses(addressList)
  }

  return (
    <Box w="vw">
      <Flex direction="row">
        <Flex direction="column" flex={0.6} h="100vh">
          <DebouncedTextArea
            initText={initAddresses.join("\n")}
            onChange={onTextChange}
          />
          <HStack flex={0.1}>
            <Box w={10}>
              <a href="https://github.com/gparuthi/maptools">
                <GithubIcon />
              </a>
            </Box>
          </HStack>
        </Flex>
        <Box flex={1} border="4px">
          <MapContainer API_Key={geocodeAPIKey} array={places} />
        </Box>
      </Flex>
    </Box>
  )
}

export default Home
