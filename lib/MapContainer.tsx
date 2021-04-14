import { Place } from "../pages"
import Map from "./google/Map"

function addMarkers(map, links) {
  links.forEach((link, index) => {
    // @ts-ignore
    const marker = new window.google.maps.Marker({
      map,
      position: link.coords,
      label: `${index + 1}`,
      title: link.title,
    })
    marker.addListener(`click`, () => {
      console.log(link.title)
    })
  })
}
interface Props {
  places: Place[]
}
const MapContainer = ({places}: Props) => {
  const initCoords = {lat: 10, lng:20} 
  const initCenter = places[0]? places[0].coords : initCoords
  const mapProps = {
    options: { center: initCenter, zoom: 12 },
    onMount: addMarkers, 
    onMountProps: places, 
  }
  return <Map {...mapProps} />
}

export default MapContainer
