import axios from 'axios';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json',
      {
        params: {
          address: address,
          key: GOOGLE_MAPS_API_KEY
        }
      }
    );

    if (response.data.results && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
        formattedAddress: response.data.results[0].formatted_address
      };
    }

    throw new Error('No results found for this address');
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
};

export const geocodeMultipleAddresses = async (locations) => {
  const promises = locations.map(async (location) => {
    try {
      const coords = await geocodeAddress(location.address);
      return {
        ...location,
        ...coords
      };
    } catch (error) {
      console.error(`Failed to geocode ${location.name}:`, error);
      return {
        ...location,
        lat: null,
        lng: null,
        error: true
      };
    }
  });

  return Promise.all(promises);
};
