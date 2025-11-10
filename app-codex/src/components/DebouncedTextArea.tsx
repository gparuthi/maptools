import { Textarea } from "@chakra-ui/react"
import { ChangeEvent, useEffect, useState } from "react"
import useDebounce from "../hooks/useDebounce"

interface Props {
  initText: string
  onChange: (value: string) => void
}

const DebouncedTextArea = ({ initText, onChange }: Props) => {
  const [textInputValue, setTextInput] = useState(initText)
  const debouncedText = useDebounce(textInputValue)

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(event.target.value)
  }

  useEffect(() => {
    onChange(debouncedText)
  }, [debouncedText, onChange])

  return (
    <Textarea
      flex={1}
      placeholder="Enter address lines here"
      onChange={handleChange}
      value={textInputValue}
    />
  )
}

export default DebouncedTextArea
