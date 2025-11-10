import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import './MapView.css';

const MapView = ({ locations, selectedLocation, onMarkerClick }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [infoWindowOpen, setInfoWindowOpen] = useState(null);
  const [center, setCenter] = useState({ lat: 37.5629, lng: -122.3255 });
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (selectedLocation && selectedLocation.lat && selectedLocation.lng) {
      setCenter({ lat: selectedLocation.lat, lng: selectedLocation.lng });
      setZoom(15);
      setInfoWindowOpen(selectedLocation.id);
    }
  }, [selectedLocation]);

  const validLocations = locations.filter(loc => loc.lat && loc.lng);

  const handleMarkerClick = (location) => {
    setInfoWindowOpen(location.id);
    onMarkerClick(location);
  };

  return (
    <div className="map-view">
      <APIProvider apiKey={apiKey}>
        <Map
          center={center}
          zoom={zoom}
          mapId="location-map"
          gestureHandling="greedy"
          disableDefaultUI={false}
        >
          {validLocations.map((location) => (
            <React.Fragment key={location.id}>
              <AdvancedMarker
                position={{ lat: location.lat, lng: location.lng }}
                onClick={() => handleMarkerClick(location)}
              >
                <div className="custom-marker">
                  <div className="marker-pin"></div>
                </div>
              </AdvancedMarker>

              {infoWindowOpen === location.id && (
                <InfoWindow
                  position={{ lat: location.lat, lng: location.lng }}
                  onCloseClick={() => setInfoWindowOpen(null)}
                >
                  <div className="info-window">
                    <h3>{location.name}</h3>
                    <p>{location.address}</p>
                  </div>
                </InfoWindow>
              )}
            </React.Fragment>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapView;
