import { Box, Divider, Flex, HStack, Link } from "@chakra-ui/layout"
import Head from "next/head"
import { geocodeAPIKey } from "../lib/config"
import { usePlaces } from "../lib/hooks"
import { GithubIcon } from "../lib/Icons"
import MapContainer from "../lib/MapContainer"
import { DataExtractor } from "./extract"

const Home = () => {
  const [places, setAddresses, setPlaces] = usePlaces([])

  const onTextChange = (inputValue: string) => {
    const addressList = inputValue.split("\n").filter((s) => s.length > 4)
    setPlaces([])
    setAddresses(addressList)
  }

  return (
    <Box w="vw">
      <Head>
        <title>Visualize addresses on a map</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Flex direction="row">
        <Flex direction="column" flex={0.6} h="100vh">
          <Box>
            <strong>What is this tool?</strong>
            <p>
              Many websites show a bunch of places to their audience without
              showing a map view. Wouldn't it be nice to show these places on a
              map?
            </p>
            <p>Examples:</p>
            <ul>
              <li>
                -{" "}
                <a href="https://sf.gov/vaccine-sites">SF Govt Vaccine Sites</a>{" "}
                shows a list of vaccine sites.{" "}
              </li>
              <li>
                - Interesting location in a city list{" "}
                <a href="https://www.timeout.com/san-francisco/nightlife/best-nightclubs-in-san-francisco?itm_source=parsely-api">
                  this
                </a>
              </li>
            </ul>
          </Box>
          <Divider m={10} />
          <Box flex={1}>
            <DataExtractor onDone={onTextChange} />
          </Box>
          <HStack flex={0.1}>
            <Box w={10}>
              <a href="https://github.com/gparuthi/maptools">
                <GithubIcon />
              </a>
            </Box>
            <Link href="/simple">Simple text-to-map visualizer</Link>
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
