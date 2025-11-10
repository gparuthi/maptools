import React from "react"
import ReactDOM from "react-dom"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import App from "./App"
import "./index.css"

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root") as HTMLElement
)
