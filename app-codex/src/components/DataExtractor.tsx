import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useClipboard,
} from "@chakra-ui/react"
import { useState } from "react"

interface Props {
  onDone: (text: string) => void
}

export const DataExtractor = ({ onDone }: Props) => {
  const [webpage, setWebpage] = useState("https://sf.gov/vaccine-sites")
  const [titleSelector, setTitleSelector] = useState(".vaccine-site__title")
  const [addressSelector, setAddressSelector] = useState(
    ".vaccine-site__address a"
  )

  const onSubmit = async () => {
    try {
      const response = await fetch(webpage)
      const html = await response.text()

      const parser = new DOMParser()
      const doc = parser.parseFromString(html, "text/html")

      const titles = Array.from(
        doc.querySelectorAll<HTMLElement>(titleSelector)
      ).map((element) => element.innerText.trim())

      const addresses = Array.from(
        doc.querySelectorAll<HTMLElement>(addressSelector)
      ).map((element) => element.innerText.trim())

      const combined = titles
        .map((title, index) => [addresses[index], title].join(" | "))
        .join("\n")

      onDone(combined)
    } catch (error) {
      console.error("Failed to extract data", error)
    }
  }

  return (
    <Box>
      <Stack>
        <FormControl id="webpage">
          <FormLabel>Webpage URL to scrape the data from</FormLabel>
          <Input
            value={webpage}
            placeholder="Webpage URL to scrape the data from"
            onChange={(event) => setWebpage(event.target.value)}
          />
        </FormControl>

        <FormControl id="titleSelector">
          <FormLabel>Place title CSS selector</FormLabel>
          <Input
            value={titleSelector}
            placeholder="Title selector"
            onChange={(event) => setTitleSelector(event.target.value)}
          />
        </FormControl>

        <FormControl id="addressSelector">
          <FormLabel>Place address CSS selector</FormLabel>
          <Input
            value={addressSelector}
            placeholder="Address selector"
            onChange={(event) => setAddressSelector(event.target.value)}
          />
        </FormControl>
        <Button w={200} onClick={onSubmit}>
          Show data on map
        </Button>
      </Stack>
    </Box>
  )
}

export const DataExtractorWithPreview = () => {
  const [result, setResult] = useState("")
  const { hasCopied, onCopy } = useClipboard(result)

  return (
    <Box>
      <Stack>
        <DataExtractor onDone={setResult} />
        <Button onClick={onCopy} ml={2}>
          {hasCopied ? "Copied" : "Copy"}
        </Button>
        <Textarea h={500} value={result} readOnly />
      </Stack>
    </Box>
  )
}
