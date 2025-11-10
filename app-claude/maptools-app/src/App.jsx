import { useState, useEffect } from 'react';
import LocationList from './components/LocationList';
import MapView from './components/MapView';
import { locations as initialLocations } from './data/locations';
import { geocodeMultipleAddresses } from './services/geocoding';
import './App.css';

function App() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        setLoading(true);
        const geocodedLocations = await geocodeMultipleAddresses(initialLocations);
        setLocations(geocodedLocations);
      } catch (error) {
        console.error('Error loading locations:', error);
        setLocations(initialLocations);
      } finally {
        setLoading(false);
      }
    };

    loadLocations();
  }, []);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading locations and geocoding addresses...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <LocationList
          locations={locations}
          selectedLocation={selectedLocation}
          onLocationClick={handleLocationClick}
        />
      </div>
      <div className="map-container">
        <MapView
          locations={locations}
          selectedLocation={selectedLocation}
          onMarkerClick={handleMarkerClick}
        />
      </div>
    </div>
  );
}

export default App;
