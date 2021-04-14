import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api"
import React, { useEffect, useRef, useState } from "react"

// from https://medium.com/@allynak/how-to-use-google-map-api-in-react-app-edb59f64ac9d
const MapContainer = ({ array, API_Key }) => {
  const [selected, setSelected] = useState({})

  const markerRef = useRef(null)

  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  }

  const onSelect = (item) => {
    console.log(item)
    setSelected(item)
  }

  const mapStyles = {
    marginTop: "-20px",
    height: "100vh",
    width: "100%",
  }

  return (
    <>
      <LoadScript
        id="script-loader"
        googleMapsApiKey={API_Key}
      >
        <GoogleMap
          id="example-map"
          mapContainerStyle={mapStyles}
          draggable={true}
          zoom={12}
          center={array && array[0] ? array[0].location : defaultCenter}
        >
          {array
            ? array.map((item) => {
              console.log(item)
                return (
                  <Marker
                    key={item.id}
                    position={item.location}
                    onClick={() => onSelect(item)}
                  />
                )
              })
            : null}
            {
            selected.location && 
            (
              <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p style={{color: "black"}}>{selected.title} | {selected.address}</p>
            </InfoWindow>
            )
         }
        </GoogleMap>
      </LoadScript>
    </>
  )
}

export default MapContainer
