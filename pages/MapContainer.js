import Map from "../lib/google/Map"

function addMarkers(map, links) {
  links.forEach((link, index) => {
    const marker = new window.google.maps.Marker({
      map,
      position: link.coords,
      label: `${index + 1}`,
      title: link.title,
    })
    marker.addListener(`click`, () => {
      window.location.href = link.url
    })
  })
}

const MapContainer = ({places}) => {
  const mapProps = {
    options: { center: places[0].coords, zoom: 12 },
    onMount: addMarkers, 
    onMountProps: places, 
  }
  return <Map {...mapProps} />
}

export default MapContainer
