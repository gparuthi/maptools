import { Button } from "@chakra-ui/button"
import { FormLabel } from "@chakra-ui/form-control"
import { FormControl } from "@chakra-ui/form-control"
import { useClipboard } from "@chakra-ui/hooks"
import { Input } from "@chakra-ui/input"
import { Stack } from "@chakra-ui/layout"
import { Box } from "@chakra-ui/layout"
import { Textarea } from "@chakra-ui/textarea"
import { useState } from "react"

export const DataExtractor = ({ onDone }) => {
  const [webpage, setWebpage] = useState(`https://sf.gov/vaccine-sites`)
  const [titleSelector, setTitleSelector] = useState(`.vaccine-site__title`)
  const [addressSelector, setAddressSelector] = useState(
    `.vaccine-site__address a`
  )
  const onSubmit = () => {
    //   query webpage
    fetch(webpage).then((data) => {
      data.text().then((html) => {
        var parser = new DOMParser()
        var doc = parser.parseFromString(html, "text/html")

        const titles = [
          //@ts-ignore
          ...doc.querySelectorAll(titleSelector).values(),
        ].map((e) => e.innerHTML.trim())

        const addresses = [
          //@ts-ignore
          ...doc.querySelectorAll(addressSelector).values(),
        ].map((e) => e.innerHTML.trim())
        onDone(titles.map((e, i) => [addresses[i], e].join(" | ")).join("\n"))
      })
    })
  }
  return (
    <Box>
      <Stack>
        <FormControl id="webpage">
          <FormLabel>Webpage URL to scrape the data from</FormLabel>
          <Input
            value={webpage}
            placeholder="Webpage URL to scrape the data from"
            onChange={(e) => setWebpage(e.target.value)}
          />
        </FormControl>

        <FormControl id="titleSelector">
          <FormLabel>Place's title css selector</FormLabel>
          <Input
            value={titleSelector}
            placeholder="title selector code"
            onChange={(e) => setTitleSelector(e.target.value)}
          />
        </FormControl>
        <FormControl id="addressSelector">
          <FormLabel>Place's address css selector</FormLabel>
          <Input
            value={addressSelector}
            placeholder="address selector code"
            onChange={(e) => setAddressSelector(e.target.value)}
          />
        </FormControl>
        <Button w={100} onClick={onSubmit}>
          Submit
        </Button>
      </Stack>
    </Box>
  )
}

const Page = () => {
  const [result, setResult] = useState("")
  const { hasCopied, onCopy } = useClipboard(result)

  return (
    <Box>
      <Stack>
        <DataExtractor onDone={setResult} />
        <Button onClick={onCopy} ml={2}>
          {hasCopied ? "Copied" : "Copy"}
        </Button>
        <Textarea h={500} value={result} />
      </Stack>
    </Box>
  )
}
export default Page
