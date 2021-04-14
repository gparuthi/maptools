import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import React, { useEffect, useRef, useState } from "react"

const MapContainer = ({ array, API_Key }) => {
  const [selected, setSelected] = useState({})

  const markerRef = useRef(null)

  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  }

  const onSelect = (item) => {
    console.log(item)
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
          zoom={10}
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
        </GoogleMap>
      </LoadScript>
    </>
  )
}

export default MapContainer
