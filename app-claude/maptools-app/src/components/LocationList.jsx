import React from 'react';
import './LocationList.css';

const LocationList = ({ locations, selectedLocation, onLocationClick }) => {
  return (
    <div className="location-list">
      <div className="location-list-header">
        <h2>Locations</h2>
        <div className="location-count">{locations.length} places</div>
      </div>
      <div className="location-list-items">
        {locations.map((location) => (
          <div
            key={location.id}
            className={`location-item ${
              selectedLocation?.id === location.id ? 'selected' : ''
            }`}
            onClick={() => onLocationClick(location)}
          >
            <div className="location-name">{location.name}</div>
            <div className="location-address">{location.address}</div>
            {location.error && (
              <div className="location-error">Unable to geocode</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
