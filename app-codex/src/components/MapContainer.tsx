import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api"
import { Box, Text } from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { Place } from "../types"

interface Props {
  apiKey: string
  places: Place[]
}

const defaultCenter = {
  lat: 37.7467497,
  lng: -122.4205566,
}

const mapStyles = {
  height: "100vh",
  width: "100%",
}

const MapContainer = ({ apiKey, places }: Props) => {
  const [selected, setSelected] = useState<Place | null>(null)

  const center = useMemo(() => {
    if (places.length) {
      return places[0].location
    }
    return defaultCenter
  }, [places])

  if (!apiKey) {
    return (
      <Box
        h="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.900"
      >
        <Text textAlign="center">
          Add `VITE_GOOGLE_MAPS_API_KEY` to load the map.
        </Text>
      </Box>
    )
  }

  return (
    <LoadScript id="script-loader" googleMapsApiKey={apiKey}>
      <GoogleMap id="map" mapContainerStyle={mapStyles} zoom={12} center={center}>
        {places.map((place) => (
          <Marker
            key={place.id}
            position={place.location}
            onClick={() => {
              setSelected(place)
            }}
          />
        ))}
        {selected && (
          <InfoWindow
            position={selected.location}
            onCloseClick={() => setSelected(null)}
          >
            <Box color="black">
              <Text fontWeight="bold">{selected.title || "Untitled location"}</Text>
              <Text>{selected.address}</Text>
            </Box>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default MapContainer
