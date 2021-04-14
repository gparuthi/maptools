import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react"
import { useState } from "react"

const MarkerFromQuery = ({ title, name, q }) => {
  const [loc, setLoc] = useState([null, null])
  const onClick = ()=>{
    console.log(title)
  }
  return (
    <Marker onClick={onClick} title={title} name={name}  />
  )
}

class Test extends Marker {
 render(){
  return <Marker name={"Current location"} />
 }
}

const MapContainer = ({ google }) => (
  <Map google={google} zoom={13}>
    <Test />
    <MarkerFromQuery name="test" title="test2" />
    <InfoWindow>
      <div>
        <h1>test</h1>
      </div>
    </InfoWindow>
  </Map>
)

export default GoogleApiWrapper({
  apiKey: "AIzaSyCQUW6EwMcjEAfcMibW97dGvZKLClkGCj8",
})(MapContainer)
