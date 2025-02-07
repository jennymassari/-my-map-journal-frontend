import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import geoData from "../data/countries.geo.json"; // Your GeoJSON file
import "leaflet/dist/leaflet.css";

const Country = ({ countries, onSelectionUpdate, onSelectCountry }) => {
  const [selectedCountry, setSelectedCountry] = useState(null); // Only one country selected at a time
  const [countryStatuses, setCountryStatuses] = useState({}); // Track statuses for each country
  const navigate = useNavigate();

  // Handle country click (select country)
  const handleCountryClick = (e) => {
    const countryName = e.target.feature.properties.name;
    setSelectedCountry(countryName); // Set the selected country
    onSelectCountry(countryName); // Pass the selected country name to the parent component
  };

  // Handle status change (Born in, Visited, Want to Visit)
  const handleStatusChange = (status) => {
    if (selectedCountry) {
      // Update the status for the selected country only
      setCountryStatuses((prevStatuses) => ({
        ...prevStatuses,
        [selectedCountry]: status, // Assign the selected status to the country
      }));
      // Call onSelectionUpdate with the selected country and status
      onSelectionUpdate(selectedCountry, status);
    }
  };

  // Navigate to Experience page when ready
  const goToExperience = () => {
    if (selectedCountry) {
      const status = countryStatuses[selectedCountry];
      if (status) {
        navigate(`/experience/${selectedCountry}`);
      } else {
        alert("Please select a status for the country first!");
      }
    } else {
      alert("Please select a country first!");
    }
  };

  // Get color for each country based on its status
  const getColor = (country) => {
    // Get status from state, default to 'none' if no status assigned
    const status = countryStatuses[country] || 'none';
    switch (status) {
      case 'born':
        return 'red'; // Red color for Born in
      case 'visit':
        return 'orange'; // Orange color for Want to Visit
      case 'visited':
        return 'green'; // Green color for Visited
      default:
        return '#cccccc'; // Default gray color for countries without status
    }
  };

  const countryStyle = {
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };

  return (
    <div className="container">
      <h2>Select a Country</h2>
      <div className="map-container">
        <MapContainer center={[20, 0]} zoom={2} style={{ width: "100%", height: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <GeoJSON
            data={geoData} // GeoJSON data
            style={(feature) => ({
              ...countryStyle,
              fillColor: getColor(feature.properties.name), // Apply color based on status
            })}
            onEachFeature={(feature, layer) => {
              layer.on({
                click: handleCountryClick, // Handle click event
              });
            }}
          />
        </MapContainer>
      </div>

      {selectedCountry && (
        <div>
          <h2>Selected Country: {selectedCountry}</h2>
          <div className="status-buttons">
            <button onClick={() => handleStatusChange("born")}>Born in</button>
            <button onClick={() => handleStatusChange("visit")}>Want to Visit</button>
            <button onClick={() => handleStatusChange("visited")}>Visited</button>
          </div>
          <button onClick={goToExperience}>Add/View Experience</button>
        </div>
      )}
    </div>
  );
};

export default Country;



