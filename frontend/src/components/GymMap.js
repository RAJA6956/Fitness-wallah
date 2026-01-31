import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

function GymMap() {
  const [center, setCenter] = useState(null);
  const [gyms, setGyms] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setCenter(loc);
        fetchNearbyGyms(loc);
      },
      () => {
        const fallback = { lat: 28.6139, lng: 77.209 };
        setCenter(fallback);
        fetchNearbyGyms(fallback);
      }
    );
  }, []);

  const fetchNearbyGyms = (location) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      location,
      radius: 5000,
      type: "gym",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setGyms(results);
      }
    });
  };

  if (!isLoaded || !center) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={center}
    >
      {/* User location */}
      <Marker position={center} label="You" />

      {/* Gym markers */}
      {gyms.map((gym) => (
        <Marker
          key={gym.place_id}
          position={{
            lat: gym.geometry.location.lat(),
            lng: gym.geometry.location.lng(),
          }}
          title={gym.name}
        />
      ))}
    </GoogleMap>
  );
}

export default GymMap;
