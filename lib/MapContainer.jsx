import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api"
import React, { useEffect, useRef, useState } from "react"

// from https://medium.com/@allynak/how-to-use-google-map-api-in-react-app-edb59f64ac9d
const MapContainer = ({ array, API_Key }) => {
  const [selected, setSelected] = useState({})

  const defaultCenter = {
    lat: 37.7467497,
    lng: -122.4205566,
  }

  const onSelect = (item) => {
    console.log(item)
    setSelected(item)
    document.activeElement.blur()
  }

  const mapStyles = {
    height: "100vh",
    width: "100%",
  }

  return (
    <>
      <LoadScript id="script-loader" googleMapsApiKey={API_Key}>
        <GoogleMap
          id="example-map"
          mapContainerStyle={mapStyles}
          zoom={12}
          center={array && array[0] ? array[0].location : defaultCenter}
        >
          {array
            ? array.map((item) => {
                return (
                  <Marker
                    key={item.id}
                    position={item.location}
                    onClick={(e) => {
                      e.stop()
                      onSelect(item)
                    }}
                  />
                )
              })
            : null}
          {selected.location && (
            <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p style={{ color: "black" }}>
                <p>
                  <strong>{selected.title}</strong>
                </p>
                <p>{selected.address}</p>
              </p>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  )
}

export default MapContainer
