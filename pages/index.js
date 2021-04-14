import { Box, Flex } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useState } from "react";
import getPlaces from "../lib/utils/getPlaces";
import MapContainer from "./MapContainer";
const place = {
  coords: { lat: 42, lng: 42 }, // required: latitude & longitude at which to display the marker
  title: `Life, the Universe and Everything`, // optional
  url: `https://wikipedia.org/wiki/Life,_the_Universe_and_Everything`, // optional
}

export default function Home() {
  return (
    <Box w="vw">
      <Flex direction="row">
        <Box flex={0.6}>
          <Textarea placeholder="Enter address lines here" h="100vh"></Textarea>
        </Box>
        <Box flex={1} border="4px">
          <MapContainer places={[place]} />
        </Box>
      </Flex>
    </Box>
  )
}
