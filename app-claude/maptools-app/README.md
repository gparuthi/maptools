# Location Mapper

A React application that displays locations on Google Maps with geocoding support. The app features a split-screen layout with a location list on the left and an interactive map on the right.

## Features

- Display multiple locations on Google Maps
- Automatic geocoding of text addresses to coordinates
- Interactive location list with selection highlighting
- Click locations in the list to center the map on them
- Click markers on the map to highlight locations in the list
- Info windows with location details
- Responsive design for mobile and desktop
- Dark theme sidebar
- Custom map markers with animations

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Maps API Key with the following APIs enabled:
  - Maps JavaScript API
  - Geocoding API

## Getting Started

### 1. Get a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Geocoding API
4. Create credentials (API Key)
5. Copy your API key

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory (or copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and add your Google Maps API key:

```
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 4. Run the Application

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── LocationList.jsx       # Left sidebar with location list
│   ├── LocationList.css
│   ├── MapView.jsx            # Google Maps component
│   └── MapView.css
├── services/
│   └── geocoding.js           # Geocoding service for address conversion
├── data/
│   └── locations.js           # Sample location data
├── App.jsx                    # Main app component
├── App.css
└── main.jsx
```

## Customization

### Adding Your Own Locations

Edit `src/data/locations.js` to add your own locations:

```javascript
export const locations = [
  {
    id: 1,
    name: "Location Name",
    address: "123 Main St, City, State"
  },
  // Add more locations...
];
```

The app will automatically geocode the addresses when it loads.

### Styling

- `src/components/LocationList.css` - Style the location list sidebar
- `src/components/MapView.css` - Style the map and markers
- `src/App.css` - Style the overall layout

### Map Configuration

In `src/components/MapView.jsx`, you can customize:
- Initial map center and zoom level
- Map controls and UI elements
- Marker appearance and behavior
- Info window content

## Technologies Used

- React 18
- Vite
- @vis.gl/react-google-maps
- Google Maps JavaScript API
- Google Geocoding API
- Axios for HTTP requests

## API Rate Limits

Be aware of Google Maps API usage limits:
- Geocoding API: 50 requests per second
- Maps JavaScript API: 30,000 map loads per month (free tier)

For production use, consider:
- Caching geocoded results
- Implementing request throttling
- Monitoring your API usage

## License

MIT
