import { Input } from "@chakra-ui/input"
import { AspectRatio, Flex } from "@chakra-ui/layout"
import { HStack } from "@chakra-ui/layout"
import { Box } from "@chakra-ui/layout"
import { Textarea } from "@chakra-ui/textarea"
import MapContainer from "./MapContainer"

export default function Home() {
  return (
    <Box w="vw">
      <Flex direction="row">
        <Box flex={0.6}>
          <Textarea placeholder="Enter address lines here" h="100vh"></Textarea>
        </Box>
        <Box flex={1} border="4px">
          <MapContainer />
        </Box>
      </Flex>
    </Box>
  )
}
