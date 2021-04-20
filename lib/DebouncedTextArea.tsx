import { Textarea } from "@chakra-ui/textarea"
import { useEffect, useState } from "react"
import { useDebounce } from "./hooks"

interface Props {
  initText: string
  onChange: (t: string) => void
}
const DebouncedTextArea = ({ initText, onChange }: Props) => {
  const [textInputValue, setTextInput] = useState(initText)
  const debouncedText = useDebounce(textInputValue)
  const onTextChange = (e) => {
    let inputValue: string = e.target.value
    setTextInput(inputValue)
  }
  useEffect(() => {
    onChange(debouncedText)
  }, [debouncedText])
  return (
    <Textarea
      flex={1}
      placeholder="Enter address lines here"
      onChange={onTextChange}
      value={textInputValue}
    ></Textarea>
  )
}

export default DebouncedTextArea
