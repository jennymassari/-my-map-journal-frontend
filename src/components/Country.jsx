import React, { useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import geoData from "../data/countries.geo.json"; // Your GeoJSON file
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Country = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryStatus, setCountryStatus] = useState(null);
  const navigate = useNavigate();

  // Handle country click (select country)
  const handleCountryClick = (e) => {
    const countryName = e.target.feature.properties.name;
    setSelectedCountry(countryName);
  };

  // Handle status change (Born in, Visited, Want to Visit)
  const handleStatusChange = (status) => {
    setCountryStatus(status);
  };

  // Navigate to Experience page when ready
  const goToExperience = () => {
    if (selectedCountry && countryStatus) {
      navigate(`/experience/${selectedCountry}`);
    } else {
      alert("Please select a country and status first!");
    }
  };

  // Style the country on the map
  const getColor = (country) => {
    if (selectedCountry !== country) return "#cccccc"; // Default gray
    switch (countryStatus) {
      case "born":
        return "blue";
      case "visit":
        return "orange";
      case "visited":
        return "green";
      default:
        return "#cccccc";
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
    <div>
      <h1>Select a Country</h1>
      <MapContainer center={[20, 0]} zoom={2} style={{ width: "100%", height: "500px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON
          data={geoData} // GeoJSON data
          style={(feature) => ({
            ...countryStyle,
            fillColor: getColor(feature.properties.name),
          })}
          onEachFeature={(feature, layer) => {
            layer.on({
              click: handleCountryClick,
            });
          }}
        />
      </MapContainer>

      {selectedCountry && (
        <div>
          <h2>Selected Country: {selectedCountry}</h2>
          <button onClick={() => handleStatusChange("born")}>Born in</button>
          <button onClick={() => handleStatusChange("visit")}>Want to Visit</button>
          <button onClick={() => handleStatusChange("visited")}>Visited</button>
          <button onClick={goToExperience}>Add Experience</button>
        </div>
      )}
    </div>
  );
};

export default Country;
