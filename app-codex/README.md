# Map Tools

Single-page React app (Vite + TypeScript + Chakra UI) that turns plain text
addresses into pins on a Google Map.

## Getting Started
1. Create a Google Cloud project and generate an [API key](https://console.cloud.google.com/apis/dashboard).
2. Enable these APIs on the project:
   - Maps JavaScript API
   - Geocoding API
3. Export the key so the app can read it:  
   `export VITE_GOOGLE_MAPS_API_KEY=<your-key>`
4. Install dependencies: `yarn install`
5. Start the dev server: `yarn dev`

## Features
- Paste address lines and see pins appear in real time.
- Scrape a web page with CSS selectors to build the address list.

<img width="1299" alt="Map Tools screenshot" src="https://user-images.githubusercontent.com/1958947/114782118-68f6e700-9d2e-11eb-9dcb-ac3be75485a0.png">
